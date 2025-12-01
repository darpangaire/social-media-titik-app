from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile
from post.serializers import PostSerializer
User = get_user_model()

class RegistrationSerializer(serializers.ModelSerializer):
  password = serializers.CharField(max_length=128,min_length=6,write_only=True,style={'input_type':'password'})
  
  class Meta:
    model = User
    fields = ['name','username','email','password']
    
  def validate(self, attrs):
    if User.objects.filter(email=attrs['email']).exists():
      raise serializers.ValidationError({'email':'Email is already in use'})
    if User.objects.filter(username=attrs['username']).exists():
      raise serializers.ValidationError({'username':'Username is already in use.'})
    return attrs
    

  
  def create(self, validated_data):
    user = User.objects.create_user(
        name=validated_data['name'],
        username=validated_data['username'],
        email=validated_data['email'],
        password=validated_data['password']  # Pass password here
    )
    return user
    
  def get_user_tokens(self,user):
    tokens = RefreshToken.for_user(user)
    return {
      'refresh':str(tokens),
      'access':str(tokens.access_token)
    }
    
 
    
    
    
  
class ProfileSerializer(serializers.ModelSerializer):
  username = serializers.CharField(source = "user.username",read_only=True)
  email = serializers.EmailField(source = "user.email",read_only=True)
  name = serializers.CharField(source = "user.name",read_only=True)
  posts = PostSerializer(source='user.posts',many=True,read_only=True)
  profile_picture = serializers.SerializerMethodField()
  
  posts_count = serializers.SerializerMethodField()
  followers_count = serializers.SerializerMethodField()
  following_count = serializers.SerializerMethodField()
  
  class Meta:
    model = Profile
    fields = ['username','email','name','bio','profile_picture','location','birth_date','posts_count','followers_count','following_count','posts']
    
  def get_posts_count(self,obj):
    return obj.posts_count()
  
  def get_followers_count(self,obj):
    return obj.followers_count()
  
  def get_following_count(self,obj):
    return obj.following_count()
  
  def get_profile_picture(self,obj):
    try:
      pic = obj.profile_picture
      if pic:
        return pic.url
    except:
      return None
    return None
    
    
  
class ProfileUpdateSerilizer(serializers.ModelSerializer):
  name = serializers.CharField(source = "user.name",read_only=True)
  class Meta:
    model = Profile
    fields = ['bio','profile_picture','location','birth_date','name']
    
    extra_kwargs = {
      'bio':{'required':False},
      'profile_picture':{'required':False},
      'location':{'required':False},
      'birth_date':{'required':False},
      'name':{'required':False}
    }
    
  