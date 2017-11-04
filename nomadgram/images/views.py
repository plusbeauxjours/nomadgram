from rest_framework.views import APIView
from rest_framework.response import Response

from . import models
from . import serializers

class ListAllImages(APIView):

    def get(self, request, format=None):

        all_images = models.Image.objects.all()
        serializer = serializers.ImageSerializer(all_images, many=True) #serializer는 단수이기 때문에 many=True를 적용한다.

        return Response(data=serializer.data)

class ListAllComments(APIView):

    def get(self, request, format=None):

        all_comments = models.Comment.objects.all()
        serializer = serializers.CommentSerializer(all_comments, many=True)

        return Response(data=serializer.data)


class ListAllLikes(APIView):

    def get(self, request, format=None):

        all_likes = models.Like.objects.all()
        serializer = serializers.LikeSerializer(all_likes, many=True)

        return Response(data=serializer.data)

