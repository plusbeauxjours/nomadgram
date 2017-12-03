from django.urls import include, path
from . import views

urlpatterns = [
    path(
        route='',
        view=views.Images.as_view(),
        name='images',
    ),
    path(
        route='<int:imge_id>/',
        view=views.ImageDetail.as_view(),
        name='like_image',
    ),
    path(
        route='<int:imge_id>/likes/',
        view=views.LikeImage.as_view(),
        name='like_image',
    ),
     path(
        route='<int:imge_id>/unlikes/',
        view=views.UnLikeImage.as_view(),
        name='unlike_image',
    ),
    path(
        route='<int:imge_id>/comments/',
        view=views.Comment.as_view(),
        name='comment_image',
    ),
    path(
        route='<int:imge_id>/comments/<int:comment_id>/',
        view=views.ModerateComment.as_view(),
        name='comment_image',
    ),
    path(
        route='comments/<int:comment_id>/',
        view=views.DeleteComment.as_view(),
        name='comment',
    ),
    path(
        route='search/',
        view=views.Search.as_view(),
        name='search',
    ),
]
