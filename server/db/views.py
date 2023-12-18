from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Comment
from datetime import datetime
from django.utils import timezone
from .serializers import CommentSerializer 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@csrf_exempt
@api_view(['PUT'])
def edit_comment(request, comment_id, format=None):
    try:
        comment = Comment.objects.get(dbid=comment_id)
    except Comment.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        try:
            serializer = CommentSerializer(comment, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'status': 'success'})
            return Response({'Bad Request': 'Invalid data.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def add_comment(request, format=None):
    try:
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            new_text = serializer.validated_data.get('text', '')
            new_image = serializer.validated_data.get('image', '')
            author = 'Admin'
            likes = 0

            new_comment = Comment(author=author, text=new_text, date=timezone.now(), image=new_image, likes=likes)
            new_comment.save()

            return Response({'Success': 'Comment added successfully.'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data.'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'Error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
def delete_comment(request, comment_id):
    if request.method == 'DELETE':
        try:
            comment = Comment.objects.get(dbid=comment_id)
            comment.delete()
            return JsonResponse({'status': 'success'})
        except Comment.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Comment not found'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

def list_comments(request):
    comments = Comment.objects.all()
    comment_list = [{'id': comment.dbid, 'author': comment.author, 'text': comment.text,
                     'date': comment.date.strftime('%Y-%m-%dT%H:%M:%SZ'), 'likes': comment.likes,
                     'image': comment.image} for comment in comments]
    return JsonResponse({'comments': comment_list})