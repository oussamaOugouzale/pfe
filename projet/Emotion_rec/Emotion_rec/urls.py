from django.contrib import admin
from django.urls import path
from app.views import home,video_feed,second
from Emotion_rec import settings
from django.conf.urls.static import static
admin.site.site_header = 'OCP administration'
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home,name="home"),
    path('second/', second, name='second'),
    path('video_feed/', video_feed, name='video_feed')
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
