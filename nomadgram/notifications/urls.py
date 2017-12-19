from django.conf.urls import include, url
from . import views

urlpatterns = [
    url(
        regex='',
        view=views.Notifications.as_view(),
        name='notifications', 
    ),
]

