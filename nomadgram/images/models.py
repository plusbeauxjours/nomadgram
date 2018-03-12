from django.db import models
from nomadgram.users import models as user_models
from taggit.managers import TaggableManager
from django.contrib.humanize.templatetags.humanize import naturaltime
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract=True

class Image(TimeStampedModel):

    file = ProcessedImageField(
        processors = [ResizeToFill(600, 400)],
        format = 'JPEG',
        options = {'quality':100}
    )
    location = models.CharField(max_length=140)
    caption = models.TextField()
    creator = models.ForeignKey(user_models.User, on_delete=models.SET_NULL, null=True, related_name='images') 
    tags = TaggableManager()

    @property
    def like_count(self):
        return self.likes.all().count()

    @property
    def comment_count(self):
        return self.comments.all().count()

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    def __str__(self):
        return 'Location: {} - Caption: {} - Creator: {}'.format(self.location, self.caption, self.creator)

    class Meta:
        ordering = ['-created_at']

class Comment(TimeStampedModel):

    message = models.TextField()
    creator = models.ForeignKey(user_models.User, on_delete=models.SET_NULL, null=True)
    image = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True, related_name='comments') # default of related_name is _set
    
    def __str__(self):
        return self.message
    
class Like(TimeStampedModel):

    creator = models.ForeignKey(user_models.User, on_delete=models.SET_NULL, null=True)
    image = models.ForeignKey(Image, null=True, on_delete=models.SET_NULL, related_name='likes')

    def __str__(self):
        return 'User: {} - Image Caption: {}'.format(self.creator.username, self.image.caption)
