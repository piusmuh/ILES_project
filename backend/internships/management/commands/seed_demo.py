from datetime import date, timedelta

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from internships.models import InternshipPlacement, WeeklyLog

User = get_user_model()


class Command(BaseCommand):
    help = "Seed demo data for ILES"

    def handle(self, *args, **options):
        admin, _ = User.objects.get_or_create(
            username="admin",
            defaults={"role": "Admin", "email": "admin@iles.com", "is_staff": True, "is_superuser": True},
        )
        admin.set_password("Admin123!")
        admin.save()

        student, _ = User.objects.get_or_create(
            username="student1",
            defaults={"role": "Student", "email": "student1@iles.com", "student_number": "ST001"},
        )
        student.set_password("Student123!")
        student.save()

        workplace, _ = User.objects.get_or_create(
            username="worksup",
            defaults={"role": "WorkplaceSupervisor", "email": "worksup@iles.com"},
        )
        workplace.set_password("Supervisor123!")
        workplace.save()

        academic, _ = User.objects.get_or_create(
            username="acadsup",
            defaults={"role": "AcademicSupervisor", "email": "acadsup@iles.com"},
        )
        academic.set_password("Supervisor123!")
        academic.save()

        placement, _ = InternshipPlacement.objects.get_or_create(
            student=student,
            defaults={
                "workplace_supervisor": workplace,
                "academic_supervisor": academic,
                "company_name": "Innovation Hub",
                "start_date": date.today() - timedelta(days=30),
                "end_date": date.today() + timedelta(days=60),
                "status": "Active",
            },
        )

        WeeklyLog.objects.get_or_create(
            student=student,
            week_number=1,
            defaults={
                "placement": placement,
                "week_start_date": date.today() - timedelta(days=7),
                "week_end_date": date.today(),
                "title": "Orientation and Setup",
                "activities": "Set up project environment and reviewed company codebase.",
                "skills_learned": "Git workflow and API testing",
                "challenges": "Configuring local dependencies",
                "due_date": date.today() + timedelta(days=1),
            },
        )

        self.stdout.write(self.style.SUCCESS("Seed data created successfully."))
