from django.db import models

class Comment(models.Model):
    author = models.CharField(max_length=255)
    text = models.TextField()
    date = models.DateTimeField()
    likes = models.IntegerField()
    image = models.URLField(blank=True)
    parent = models.CharField(max_length=255, null=True, blank=True)