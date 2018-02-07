from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from . import models
from . import serializers

from nomadgram.users import models as user_models
from nomadgram.users import serializers as user_serializers
from nomadgram.notifications import views as notification_views

class Images(APIView):

    def get(self, request, format=None):

        user = request.user
        following_users = user.following.all()
        
        image_list = []
        
        for following_user in following_users:

            user_images = following_user.images.all()[:3]   # user가 following하는 애들

            for image in user_images:
                
                image_list.append(image)    # following 받는 애들의 사진들

        # print(following_users) 
        # print(image_list)

        my_images = user.images.all()[:2]

        for image in my_images:

            image_list.append(image)

        sorted_list = sorted(image_list, key=lambda image: image.created_at, reverse=True)     
        # sorted를 하지 않을 경우, 최신순서가 아니라, 먼저 loop를 돈 user의 이미지 순서로 나오게 된다. 

        # print(sorted_list)

        serializer = serializers.ImageSerializer(sorted_list, many=True, context={'request': request})

        return Response(serializer.data)

    def post(self, request, format=None):

        user = request.user

        serializer = serializers.InputImageSerialzier(data=request.data)

        if serializer.is_valid():

            serializer.save(creator=user)

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
            

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ImageDetail(APIView):

    def find_own_image(self, image_id, user):

        try:
            image = models.Image.objects.get(id=image_id, creator=user) # edit는 아무 이미지나 다 할 수 있으면 안된다. 
            return image
        except models.Image.DoesNotExist:
            return None


    def get(self, request, image_id, format=None):
        
        user = request.user

        try:
            image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ImageSerializer(image, context={'request': request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, image_id, format=None):

        user = request.user

        image = self.find_own_image(image_id, user)

        if image is None:

            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.InputImageSerialzier(image, data=request.data, partial=True)

        if serializer.is_valid():

            serializer.save(creator=user)

            return Response(data=serializer.data, status=status.HTTP_200_OK)
 
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, image_id, format=None):

        user = request.user

        image = self.find_own_image(image_id, user)

        if image is None:

            return Response(status=status.HTTP_400_BAD_REQUEST)

        image.delete()

        return Response(status.HTTP_204_NO_CONTENT)


class LikeImage(APIView):

    def get(self, request, image_id, format=None):

        likes = models.Like.objects.filter(image__id=image_id)

        like_creators_ids = likes.values('creator_id')
        # likes를 생성한 user 를 usermodel안에서 찾는다. 

        # print(likes.values('creator_id'))
        # 해당 list의 내부의 값도 볼 수가 있다. 
        users = user_models.User.objects.filter(id__in=like_creators_ids)
        # array 안에 있는 user id를 검색한다. 
        serializer = user_serializers.ListUserSerializer(
            users, many=True, context={'request': request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request, image_id, format=None):

        user = request.user

        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)     

        try:
            preexisting_like = models.Like.objects.get(
                creator=user,
                image=found_image,
            )
            return Response(status=status.HTTP_304_NOT_MODIFIED)
        except models.Like.DoesNotExist:

            new_like = models.Like.objects.create(
                creator=user,
                image=found_image, 
            )
            # like라는 model에 추가를 하는 것이다. 상태가 변하는 것이 아니라. 

            new_like.save()

            notification_views.create_notification(user, found_image.creator, 'like', found_image)

            return Response(status=status.HTTP_201_CREATED)


class UnLikeImage(APIView):

    def delete(self, request, image_id, format=None):

        user = request.user
    
        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)     

        try:
            preexisting_like = models.Like.objects.get(
                creator=user,
                image=found_image,
            )
            preexisting_like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except models.Like.DoesNotExist:
            return Response(status=status.HTTP_304_NOT_MODIFIED)

class Comment(APIView):

    def post(self, request, image_id, format=None):

        user = request.user

        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = serializers.CommentSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(creator=user, image=found_image)

            notification_views.create_notification(user, found_image.creator, 'comment', found_image, serializer.data['message'])

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteComment(APIView):

    def delete(self, request, comment_id, format=None):
        
        user = request.user

        try:
            comment = models.Comment.objects.get(id=comment_id, creator=user)
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except models.Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class Search(APIView):

    def get(self, request, format=None):

        hashtags = request.query_params.get('hashtags', None)

        if hashtags is not None:

            hashtags = hashtags.split(',')  # ','를 통해 string을 list로 바꿔준다.

            images = models.Image.objects.filter(tags__name__in=hashtags).distinct()

            serializer = serializers.CountImageSerializer(images, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        else:

            return Response(status=status.HTTP_400_BAD_REQUEST) 
            # hashtags가 없이 http://localhost:8000/images/search/로 검색 할 경우 
            # hashtags = request.query_params.get('hashtags', None)에서 None이 넘어가
            # AttributeError가 뜬다. 
 

class ModerateComment(APIView):

    def delete(self, request, image_id, comment_id, format=None):

        user = request.user

        try:
            comment_to_delete = models.Comment.objects.get(
                id=comment_id, image__id=image_id, image__creator=user)
                # comment object는 image object를 안에 가지고 있다. 그래서 별도로 이미지를 불러 올 필요가 없다. 
                # comment id 1번의 image id를 체크하고, creator가 본인인지 확인
                # image__id는 comment가 향하는 image의 id
                # image__creator는 comment가 향하는 imaged의 creator
            comment_to_delete.delete()
        except models.Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)                

        return Response(status=status.HTTP_204_NO_CONTENT)

    
# FOR PRACTICE AND UNDERSTANDING APIVIEW, SERIALIZERS.PY
# class ListAllImages(APIView):

#     def get(self, request, format=None):

#         all_images = models.Image.objects.all()
#         serializer = serializers.ImageSerializer(all_images, many=True) #serializer는 단수이기 때문에 many=True를 적용한다.

#         return Response(data=serializer.data)

# class ListAllComments(APIView):

#     def get(self, request, format=None):

#         user_id = request.user.id
#         all_comments = models.Comment.objects.filter(creator=user_id)
#         serializer = serializers.CommentSerializer(all_comments, many=True)

#         return Response(data=serializer.data)

# class ListAllLikes(APIView):

#     def get(self, request, format=None):

#         all_likes = models.Like.objects.all()
#         serializer = serializers.LikeSerializer(all_likes, many=True)

#         print(request.user.website)
        
#         return Response(data=serializer.data)

