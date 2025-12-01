from django.contrib import admin
from .models import Posts,Comment,Like,Follow,Share

# Register your models here.
admin.site.register(Posts)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Follow)
admin.site.register(Share)

