from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone

User = settings.AUTH_USER_MODEL


class PlacementStatus(models.TextChoices):
    PENDING = "Pending", "Pending"
    ACTIVE = "Active", "Active"
    COMPLETED = "Completed", "Completed"


class InternshipPlacement(models.Model):
    student = models.OneToOneField(User, on_delete=models.CASCADE, related_name="placement")
    workplace_supervisor = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="workplace_students"
    )
    academic_supervisor = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="academic_students"
    )
    company_name = models.CharField(max_length=200)
    company_address = models.CharField(max_length=255, blank=True)
    position_title = models.CharField(max_length=120, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=PlacementStatus.choices, default=PlacementStatus.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        if self.end_date <= self.start_date:
            raise ValidationError("End date must be after start date.")
        if self.student.role != "Student":
            raise ValidationError("Placement student must have role Student.")
        if self.workplace_supervisor and self.workplace_supervisor.role != "WorkplaceSupervisor":
            raise ValidationError("Workplace supervisor must have role WorkplaceSupervisor.")
        if self.academic_supervisor and self.academic_supervisor.role != "AcademicSupervisor":
            raise ValidationError("Academic supervisor must have role AcademicSupervisor.")

    def __str__(self):
        return f"{self.student.username} - {self.company_name}"


class WeeklyLogState(models.TextChoices):
    DRAFT = "Draft", "Draft"
    SUBMITTED = "Submitted", "Submitted"
    REVIEWED = "Reviewed", "Reviewed"
    APPROVED = "Approved", "Approved"
    REJECTED = "Rejected", "Rejected"


class WeeklyLog(models.Model):
    placement = models.ForeignKey(InternshipPlacement, on_delete=models.CASCADE, related_name="weekly_logs")
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name="weekly_logs")
    week_number = models.PositiveIntegerField()
    week_start_date = models.DateField()
    week_end_date = models.DateField()
    title = models.CharField(max_length=180)
    activities = models.TextField()
    skills_learned = models.TextField(blank=True)
    challenges = models.TextField(blank=True)
    supervisor_comment = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=WeeklyLogState.choices, default=WeeklyLogState.DRAFT)
    submitted_at = models.DateTimeField(null=True, blank=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)
    approved_at = models.DateTimeField(null=True, blank=True)
    due_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        unique_together = ("student", "week_number")

    def clean(self):
        if self.student.role != "Student":
            raise ValidationError("Weekly logs can only belong to student users.")
        if self.placement.student_id != self.student_id:
            raise ValidationError("Selected placement does not belong to this student.")
        if self.week_end_date < self.week_start_date:
            raise ValidationError("Week end date must be on or after week start date.")
        if self.status == WeeklyLogState.APPROVED and self.pk:
            original = WeeklyLog.objects.get(pk=self.pk)
            changed = (
                original.title != self.title
                or original.activities != self.activities
                or original.skills_learned != self.skills_learned
                or original.challenges != self.challenges
            )
            if changed:
                raise ValidationError("Approved weekly logs cannot be edited.")

    def can_transition_to(self, new_status):
        transitions = {
            WeeklyLogState.DRAFT: {WeeklyLogState.SUBMITTED},
            WeeklyLogState.SUBMITTED: {WeeklyLogState.REVIEWED, WeeklyLogState.REJECTED},
            WeeklyLogState.REVIEWED: {WeeklyLogState.APPROVED, WeeklyLogState.DRAFT},
            WeeklyLogState.REJECTED: {WeeklyLogState.DRAFT},
            WeeklyLogState.APPROVED: set(),
        }
        return new_status in transitions.get(self.status, set())

    def transition_to(self, new_status):
        if not self.can_transition_to(new_status):
            raise ValidationError(f"Invalid transition from {self.status} to {new_status}.")
        if new_status == WeeklyLogState.SUBMITTED and timezone.now().date() > self.due_date:
            raise ValidationError("Submission deadline has passed for this weekly log.")
        self.status = new_status
        now = timezone.now()
        if new_status == WeeklyLogState.SUBMITTED:
            self.submitted_at = now
        elif new_status == WeeklyLogState.REVIEWED:
            self.reviewed_at = now
        elif new_status == WeeklyLogState.APPROVED:
            self.approved_at = now
        self.save()

    def __str__(self):
        return f"{self.student.username} - Week {self.week_number}"


class EvaluationCriteria(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    weight = models.FloatField(help_text="Weight as decimal fraction, e.g. 0.4")
    is_active = models.BooleanField(default=True)

    def clean(self):
        if not 0 <= self.weight <= 1:
            raise ValidationError("Weight must be between 0 and 1.")

    def __str__(self):
        return f"{self.name} ({self.weight})"


class Evaluation(models.Model):
    weekly_log = models.OneToOneField(WeeklyLog, on_delete=models.CASCADE, related_name="evaluation")
    evaluator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="evaluations")
    technical_skills = models.PositiveSmallIntegerField()
    communication = models.PositiveSmallIntegerField()
    professionalism = models.PositiveSmallIntegerField()
    comments = models.TextField(blank=True)
    final_score = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        for field_name in ("technical_skills", "communication", "professionalism"):
            value = getattr(self, field_name)
            if value < 0 or value > 100:
                raise ValidationError(f"{field_name} score must be between 0 and 100.")
        if self.evaluator.role not in {"AcademicSupervisor", "WorkplaceSupervisor"}:
            raise ValidationError("Only supervisors can create evaluations.")

    def save(self, *args, **kwargs):
        self.final_score = (self.technical_skills * 0.4) + (self.communication * 0.3) + (self.professionalism * 0.3)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Evaluation for log {self.weekly_log_id}: {self.final_score}"
