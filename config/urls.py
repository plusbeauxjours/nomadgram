from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.views import defaults as default_views
from rest_framework_jwt.views import obtain_jwt_token
from nomadgram import views


urlpatterns = [
    url(settings.ADMIN_URL, admin.site.urls),

    # User management
    # url(r'^api-token-auth/', obtain_jwt_token),
    url(r'rest-auth/', include('rest_auth.urls')),
    url(r'rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'users/', include('nomadgram.users.urls', namespace='users')),
    url(r'images/', include('nomadgram.images.urls', namespace='images')),    
    url(r'notifications/', include('nomadgram.notifications.urls', namespace='notifications')),
    url(r'accounts/', include('allauth.urls')),

    # Your stuff: custom urls includes go here


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    url(r'^', views.ReactAppView.as_view()),
]

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        url('400/$', default_views.bad_request, kwargs={'Exception': Exception('Bad Request!')}),
        url('403/$', default_views.permission_denied, kwargs={'Exception': Exception('Permission Denied')}),
        url('404/$', default_views.page_not_found, kwargs={'Exception': Exception('Page not Found')}),
        url('500/$', default_views.server_error),
    ]
    if 'debug_toolbar' in settings.INSTALLED_APPS:
        import debug_toolbar
        urlpatterns = [
            url('__debug__/', include(debug_toolbar.urls)),
        ] + urlpatterns
