from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


# Create your models here.


class Posts(models.Model):
    user = models.ForeignKey(User,related_name='posts', on_delete=models.CASCADE)
    content = models.TextField(blank=True)
    image = models.ImageField(upload_to='postsimages/', blank=True, null=True)
    video = models.FileField(upload_to='posts/videos/',blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Posts"
    
    def __str__(self):
        return f"Post by {self.user.username} at {self.created_at}"

    
class Follow(models.Model):
    follower = models.ForeignKey(User,related_name='following',on_delete=models.CASCADE)
    
    followed = models.ForeignKey(User,related_name='followers',on_delete=models.CASCADE)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('follower','followed')
        verbose_name_plural = "Follows"
    
    def __str__(self):
        return f"{self.follower.username} follows {self.followed.username}"
    
 
class Like(models.Model):
  user = models.ForeignKey(User,related_name = 'likes',on_delete=models.CASCADE)
  post = models.ForeignKey(Posts,related_name='likes',on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True)
  
  class Meta:
    unique_together = ('user','post')
    verbose_name_plural = "Likes"
    
  def __str__(self):
    return f"{self.user.username} likes post {self.post.id}"
  

class Comment(models.Model):
  user = models.ForeignKey(User,on_delete=models.CASCADE, related_name='comments')
  post = models.ForeignKey(Posts,on_delete=models.CASCADE,related_name='comments')
  content = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  
  
  class Meta:
    ordering = ["-created_at"]
    verbose_name_plural = "Comments"
    
  def __str__(self):
    return f"Comment by {self.user.username} on post {self.post.id}"
  

class Share(models.Model):
  user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="shares")
  post = models.ForeignKey(Posts,on_delete=models.CASCADE,related_name="shares")
  created_at = models.DateTimeField(auto_now_add=True)
  
  class Meta:
    unique_together = ("user","post")
    verbose_name_plural = "Shares"
    
  def __str__(self):
    return f"{self.user.username} shared post {self.post.id}"
  
  