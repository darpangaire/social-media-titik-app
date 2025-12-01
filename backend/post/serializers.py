from rest_framework import serializers
from .models import Posts,Like,Comment,Share
from django.contrib.auth import get_user_model
User = get_user_model()

class PostSerializer(serializers.ModelSerializer):
  username = serializers.CharField(source='user.username',read_only=True)
  profile_picture = serializers.SerializerMethodField()
  likes_count = serializers.IntegerField(source='likes.count', read_only=True)
  is_liked = serializers.SerializerMethodField()
  
  class Meta:
    model = Posts
    fields = ['id','username','profile_picture','content','image','video','created_at','is_liked','likes_count']
    
  def get_profile_picture(self,obj):
    try:
      pic = obj.user.profile.profile_picture
      if pic:
        return pic.url
    except:
      return None
    return None
  
  def get_is_liked(self,post):
    request = self.context.get('request')
    if request and request.user.is_authenticated:
      return Like.objects.filter(user=request.user,post=post).exists()
    return False
  
    
  
 
class CreatePostSerializer(serializers.ModelSerializer):
  class Meta:
    model = Posts
    fields = ['content','image','video']
    
  def validate(self, attrs):
    content = attrs.get('content')
    image = attrs.get('image')
    video = attrs.get('video')
    
    if not (content or image or video):
      raise serializers.ValidationError("At least one of content, image, or video must be provided.")
    
    return attrs
  
class LikeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Like
    fields = []
    
    

  
class CommentSerializer(serializers.ModelSerializer):
  username = serializers.CharField(source = 'user.username',read_only=True)
  user_id = serializers.CharField(source='user.id',read_only=True)
  
  class Meta:
    model = Comment
    fields = ['id','username','user_id','post','content','created_at']
    read_only_fields = ['post','user','created_at']
    

class CreateCommentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = ['content']
    
  def validate(self, attrs):
    content = attrs.get('content')
    
    if not content:
      raise serializers.ValidationError("Content cannot be empty.")
    
    return attrs
  
    
 
  
    
  
    
  
     
  
