from django.urls import include, path
from . import views

urlpatterns = [
    path(
        route='',
        view=views.Notifications.as_view(),
        name='notifications', 
    ),
]

