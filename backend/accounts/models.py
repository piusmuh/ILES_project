from django.contrib.auth.models import AbstractUser
from django.db import models


class UserRole(models.TextChoices):
    STUDENT = "Student", "Student"
    WORKPLACE_SUPERVISOR = "WorkplaceSupervisor", "Workplace Supervisor"
    ACADEMIC_SUPERVISOR = "AcademicSupervisor", "Academic Supervisor"
    ADMIN = "Admin", "Internship Administrator"


class CustomUser(AbstractUser):
    role = models.CharField(max_length=32, choices=UserRole.choices, default=UserRole.STUDENT)
    department = models.CharField(max_length=150, blank=True)
    staff_number = models.CharField(max_length=50, blank=True, null=True, unique=True)
    student_number = models.CharField(max_length=50, blank=True, null=True, unique=True)
    phone_number = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.get_full_name() or self.username} ({self.role})"
