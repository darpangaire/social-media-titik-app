
    
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account,Profile

class AccountAdmin(UserAdmin):
    list_display = ('email', 'username', 'name', 'is_admin', 'is_staff')
    search_fields = ('email', 'username', 'name')
    readonly_fields = ('date_joined', 'last_login')

    ordering = ('email',)

    filter_horizontal = ()
    list_filter = ()
    fieldsets = (
        (None, {'fields': ('email', 'username', 'name', 'password')}),
        ('Permissions', {'fields': ('is_admin', 'is_staff', 'is_active', 'is_superadmin')}),
        ('Meta Data', {'fields': ('date_joined', 'last_login')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'name', 'password1', 'password2'),
        }),
    )
    


admin.site.register(Account, AccountAdmin)
admin.site.register(Profile)

