from django.shortcuts import render
from rest_framework import views
from .serializers import CommentSerializer, PostSerializer,CreatePostSerializer,CreateCommentSerializer
from rest_framework.response import Response
from rest_framework import status,permissions
from .models import Posts,Comment,Like,Follow,Share
from rest_framework.generics import ListCreateAPIView
from .paginator import PostPaginator

# Create your views here.

class PostView(ListCreateAPIView):
  permission_classes = [permissions.IsAuthenticated]
  serializer_class = PostSerializer
  pagination_class = PostPaginator
  
  def get_queryset(self):
    # feed = own posts + posts from followed users
    followed_users = Follow.objects.filter(follower=self.request.user).values_list('followed',flat=True)
    
    return Posts.objects.filter(user__in=list(followed_users) + [self.request.user.id]).order_by('-created_at')
  
  def get_serializer_context(self):
    # Important to compute is_liked correctly
    context = super().get_serializer_context()
    context["request"] = self.request
    return context

  def post(self,request,*args,**kwargs):
    serializer = CreatePostSerializer(data=request.data)
    if serializer.is_valid():
      new_post = serializer.save(user=request.user)
      response = PostSerializer(new_post)
      return Response(response.data,status=status.HTTP_200_OK)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
  
      
class CreateCommentView(views.APIView):
  permission_classes = [permissions.IsAuthenticated]
  
  def get(self,request,post_id,*args,**kwargs):
    comments = Comment.objects.filter(post__id=post_id).order_by('-created_at')
    serializer = CommentSerializer(comments,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)
  
  def post(self,request,post_id,*args,**kwargs):
    serializer = CreateCommentSerializer(data=request.data)
    if serializer.is_valid():
      try:
        post = Posts.objects.get(id = post_id)
        
      except Posts.DoesNotExist:
        return Response({"error":"Post not found"},status=status.HTTP_404_NOT_FOUND)
      
      new_comment = serializer.save(user = request.user,post=post)
      response = CreateCommentSerializer(new_comment)
      
      return Response(response.data,status=status.HTTP_200_OK)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
  

class LikePostView(views.APIView):
  permission_classes = [permissions.IsAuthenticated]
  
  def post(self,request,post_id,*args,**kwargs):
    try:
      post = Posts.objects.get(id=post_id)
      
    except Posts.DoesNotExist:
      return Response({"error":"Post not found"},status=status.HTTP_404_NOT_FOUND)
    
    already_liked = Like.objects.filter(user=request.user,post=post).exists()
    
    if already_liked:
      Like.objects.filter(user=request.user,post=post).delete()
      return Response({"message":"Post unliked successfully"},status=status.HTTP_200_OK)
    
    # create like
    Like.objects.create(user=request.user,post=post)
    return Response({"message":"Post liked successfully"},status=status.HTTP_200_OK)
  


       
      
      
      
    
    
