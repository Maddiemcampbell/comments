from django.db import models

class Comment(models.Model):
    dbid = models.TextField(default='0')
    author = models.CharField(max_length=255)
    text = models.TextField()
    date = models.DateTimeField()
    likes = models.IntegerField()
    image = models.URLField(blank=True)