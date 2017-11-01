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
    creator = models.ForeignKey(user_models.User)

class Comment(TimeStampedModel):

    message = models.TextField()
    creator = models.ForeignKey(user_models.User)
    image = models.ForeignKey(Image)
class Like(TimeStampedModel):

    creator = models.ForeignKey(user_models.User)
    image = models.ForeignKey(Image)


