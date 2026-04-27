from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (
            "Role Metadata",
            {
                "fields": ("role", "department", "staff_number", "student_number", "phone_number"),
            },
        ),
    )
