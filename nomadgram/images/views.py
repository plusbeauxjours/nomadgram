from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from . import models
from . import serializers

class Feed(APIView):

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

        sorted_list = sorted(image_list, key=lambda image: image.created_at, reverse=True)     
        # sorted를 하지 않을 경우, 최신순서가 아니라, 먼저 loop를 돈 user의 이미지 순서로 나오게 된다. 

        # print(sorted_list)

        serializer = serializers.ImageSerializer(sorted_list, many=True)

        return Response(serializer.data)


class LikeImage(APIView):

    def post(self, request, image_id, format=None):

        user = request.user

        # like notification
    
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

class CommentOnImage(APIView):

    def post(self, request, image_id, format=None):

        user = request.user

        # comment notification

        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = serializers.CommentSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(creator=user, image=found_image)
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

