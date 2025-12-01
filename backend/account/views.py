from rest_framework import status,permissions,generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegistrationSerializer,ProfileSerializer,ProfileUpdateSerilizer
from django.shortcuts import get_object_or_404
from .models import Profile
from django.contrib.auth import get_user_model
User = get_user_model()

class RegistrationView(APIView):
  permission_classes = [permissions.AllowAny]
  
  def post(self,request,*args,**kwargs):
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
      user = serializer.save()
      tokens = serializer.get_user_tokens(user)
      response_data = {
        "message":"user registered successfully",
        "user":{
          "name":user.name,
          "username":user.username,
          "email":user.email
        },
        "tokens":tokens
      }
      return Response(response_data,status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
  

class ProfileView(generics.RetrieveAPIView):
  serializer_class = ProfileSerializer
  permission_classes = [permissions.IsAuthenticated]
  
  def get_object(self):
    profile, created = Profile.objects.get_or_create(user=self.request.user)
    return profile
  
class ProfileUpdateView(generics.UpdateAPIView):
  serializer_class = ProfileUpdateSerilizer
  permission_classes = [permissions.IsAuthenticated]
  
  def get_object(self):
    profile, created = Profile.objects.get_or_create(user=self.request.user)
    return profile
  



