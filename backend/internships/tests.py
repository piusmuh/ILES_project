from datetime import date, timedelta

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.test import TestCase

from .models import Evaluation, InternshipPlacement, WeeklyLog

User = get_user_model()


class ILESModelTests(TestCase):
    def setUp(self):
        self.student = User.objects.create_user(username="st1", password="Pass1234!", role="Student")
        self.supervisor = User.objects.create_user(
            username="sup1", password="Pass1234!", role="AcademicSupervisor"
        )
        self.placement = InternshipPlacement.objects.create(
            student=self.student,
            academic_supervisor=self.supervisor,
            company_name="Tech Corp",
            start_date=date.today() - timedelta(days=30),
            end_date=date.today() + timedelta(days=30),
        )
        self.log = WeeklyLog.objects.create(
            placement=self.placement,
            student=self.student,
            week_number=1,
            week_start_date=date.today() - timedelta(days=7),
            week_end_date=date.today(),
            title="Week One",
            activities="Built onboarding module",
            due_date=date.today() + timedelta(days=1),
        )

    def test_weekly_log_state_transition(self):
        self.log.transition_to("Submitted")
        self.assertEqual(self.log.status, "Submitted")

    def test_invalid_transition_raises(self):
        with self.assertRaises(ValidationError):
            self.log.transition_to("Approved")

    def test_evaluation_weighted_score(self):
        self.log.status = "Reviewed"
        self.log.save()
        ev = Evaluation.objects.create(
            weekly_log=self.log,
            evaluator=self.supervisor,
            technical_skills=80,
            communication=70,
            professionalism=90,
        )
        self.assertEqual(float(ev.final_score), 80.0)
