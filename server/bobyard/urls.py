from django.contrib import admin
from django.urls import path
from db.views import edit_comment, add_comment, delete_comment, list_comments, list_replies

urlpatterns = [
    path('admin/', admin.site.urls),
    path('edit_comment/<int:comment_id>/', edit_comment, name='edit_comment'),
    path('add_comment/', add_comment, name='add_comment'),
    path('delete_comment/<int:comment_id>/', delete_comment, name='delete_comment'),
    path('list_comments/', list_comments, name='list_comments'),
    path('list_replies/<parent_id>/', list_replies, name='list_replies'),
]
