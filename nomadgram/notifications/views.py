from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from . import models
from . import serializers

class Notifications(APIView):

    def get(self, request, format=None):

        user = request.user

        notifications = models.Notification.objects.filter(to=user)

        serializer = serializers.NotificationSerializer(notifications, context={'request': request}, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

def create_notification(creator, to, notification_type, image = None, comment = None):

    print(creator, to, notification_type, image, comment)

    notification = models.Notification.objects.create(
        creator=creator,
        to=to,
        notification_type=notification_type,
        image=image,
        comment=comment,
    )
    notification.save()