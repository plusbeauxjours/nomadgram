from django.conf.urls import include, url


from . import views

urlpatterns = [
    url(
        regex='explore/',
        view=views.ExploreUsers.as_view(),
        name='explore_users'
    ),
    url(
        regex='<slug:username>/profileimage/',
        view=views.FollowUser.as_view(),
        name='follow_user',
    ),
    url(
        regex='<slug:username>/follow/',
        view=views.FollowUser.as_view(),
        name='follow_user',
    ),
    url(
        regex='<slug:username>/unfollow/',
        view=views.UnFollowUser.as_view(),
        name='unfollow_user',
    ),
    url(
        regex='<slug:username>/followers/',
        view=views.UserFollowers.as_view(),
        name='user_follwers',
    ),
    url(
        regex='<slug:username>/following/',
        view=views.UserFollowing.as_view(),
        name='user_follwing',
    ),
    url(
        regex='search/',
        view=views.Search.as_view(),
        name='search',
    ),
    url(    
        regex='<slug:username>/',  # ordering to bottom bcs of username 'search'
        view=views.UserProfile.as_view(),
        name='user_profile',
    ),
    url(
        regex='<slug:username>/password/',
        view=views.ChangePassword.as_view(),
        name='change',
    ),
    url(
        regex='login/facebook/', 
        view=views.FacebookLogin.as_view(), 
        name='fb_login',
    ),
]
