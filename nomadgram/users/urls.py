from django.urls import include, path


from . import views

urlpatterns = [
    path(
        route='explore/',
        view=views.ExploreUsers.as_view(),
        name='explore_users'
    ),
    path(
        route='<slug:username>/profileimage/',
        view=views.FollowUser.as_view(),
        name='follow_user',
    ),
    path(
        route='<slug:username>/follow/',
        view=views.FollowUser.as_view(),
        name='follow_user',
    ),
    path(
        route='<slug:username>/unfollow/',
        view=views.UnFollowUser.as_view(),
        name='unfollow_user',
    ),
    path(
        route='<slug:username>/followers/',
        view=views.UserFollowers.as_view(),
        name='user_follwers',
    ),
    path(
        route='<slug:username>/following/',
        view=views.UserFollowing.as_view(),
        name='user_follwing',
    ),
    path(
        route='search/',
        view=views.Search.as_view(),
        name='search',
    ),
    path(    
        route='<slug:username>/',  # ordering to bottom bcs of username 'search'
        view=views.UserProfile.as_view(),
        name='user_profile',
    ),
    path(
        route='<slug:username>/password/',
        view=views.ChangePassword.as_view(),
        name='change',
    ),
    path(
        route='login/facebook/', 
        view=views.FacebookLogin.as_view(), 
        name='fb_login',
    ),
]
