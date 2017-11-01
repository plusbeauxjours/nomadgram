from django.db import models
from nomadgram.users import models as user_models
# Create your models here.
class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract=True

class Image(TimeStampedModel):

    file = models.ImageField()
    location = models.CharField(max_length=140)
    caption = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True) 

    def __str__(self):
        return 'Location: {} - Caption: {} - Creator: {}'.format(self.location, self.caption, self.creator)

class Comment(TimeStampedModel):

    message = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True)
    image = models.ForeignKey(Image, null=True)
    
    def __str__(self):
        return self.message
    
class Like(TimeStampedModel):

    creator = models.ForeignKey(user_models.User, null=True)
    image = models.ForeignKey(Image, null=True)

    def __str__(self):
        return 'User: {} - Image Caption: {}'.format(self.creator.username, self.image.caption)
