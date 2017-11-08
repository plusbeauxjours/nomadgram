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

            user_images = following_user.images.all()[:2]   # user가 following하는 애들

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

    def get(self, request, image_id, format=None):

        user = request.user
    
        try:
            found_image = models.Image.objects.get(id=image_id)
            # like를 누를 때 넘어오는 url을 예상하고 있어야만 설계를 할 수 있다. 이 경우에는 image_id를 받기 때문에 바로 preexisting_like를 체크 할 수 있다. 
            
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)     
            # if get an except, just finish function with return even if there is more code like print() (bcs of return.)

        try:
            preexisting_like = models.Like.objects.get(
                creator=user,
                image=found_image,
            )
            # 같은 user가 like하였던 image가 있다면, foreign key로 연결되어있는 해당 like model을 지운다. 
            preexisting_like.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)
            # django-restframework에는 status code가 있기 때문에 response로 따라가는 것이다. 

        except models.Like.DoesNotExist:

            new_like = models.Like.objects.create(
                creator=user,
                image=found_image, 
            )
            # like라는 model에 추가를 하는 것이다. 상태가 변하는 것이 아니라. 

            new_like.save()

            return Response(status=status.HTTP_201_CREATED)


class UnlikeImage(APIView):

    def get(self, request, image_id, format=None):
        print(image_id)

        return Response(status=200)


# 2. we want to find an image with this id
# 3. we want to create a like for that image





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

