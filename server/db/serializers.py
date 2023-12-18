from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(required=False, format='%Y-%m-%dT%H:%M:%SZ')
    id = serializers.IntegerField(label='ID', read_only=True)
    author = serializers.CharField(max_length=255)
    text = serializers.CharField(style={'base_template': 'textarea.html'})
    likes = serializers.IntegerField(required=False)
    image = serializers.URLField(allow_blank=True, max_length=200, required=False)
    class Meta:
        model = Comment
        fields = ['id', 'author', 'text', 'date', 'likes', 'image']
