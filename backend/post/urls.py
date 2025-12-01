from django.urls import path
from .views import PostView,CreateCommentView,LikePostView

urlpatterns = [
  path('posts/', PostView.as_view(), name='posts'),
  path('posts/<int:post_id>/comments/', CreateCommentView.as_view(), name='post-comments'),
  path('posts/<int:post_id>/like/',LikePostView.as_view(),name='like-post'),
  
]

