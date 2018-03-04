from django.conf.urls import include, url


from . import views

urlpatterns = [
    url(
        regex='explore/',
        view=views.ExploreUsers.as_view(),
        name='explore_users'
    ),
    url(
        regex=r'^(?P<username>\w+)/profileimage/',
        view=views.FollowUser.as_view(),
        name='follow_user',
    ),
    url(
        regex=r'^(?P<username>\w+)/follow/$',
        view=views.FollowUser.as_view(),
        name='follow_user',
    ),
    url(
        regex=r'^(?P<username>\w+)/unfollow/$',
        view=views.UnFollowUser.as_view(),
        name='unfollow_user',
    ),
    url(
        regex=r'^(?P<username>\w+)/followers/$',
        view=views.UserFollowers.as_view(),
        name='user_follwers',
    ),
    url(
        regex=r'^(?P<username>\w+)/following/$',
        view=views.UserFollowing.as_view(),
        name='user_follwing',
    ),
    url(
        regex=r'^search/$',
        view=views.Search.as_view(),
        name='search',
    ),
    url(    
        regex=r'^(?P<username>\w+)/$',  # ordering to bottom bcs of username 'search'
        view=views.UserProfile.as_view(),
        name='user_profile',
    ),
    url(
        regex=r'^(?P<username>\w+)/password/$',
        view=views.ChangePassword.as_view(),
        name='change',
    ),
    url(
        regex='login/facebook/', 
        view=views.FacebookLogin.as_view(), 
        name='fb_login',
    ),
]
