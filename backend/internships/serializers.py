from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Evaluation, EvaluationCriteria, InternshipPlacement, WeeklyLog, WeeklyLogState

User = get_user_model()


class InternshipPlacementSerializer(serializers.ModelSerializer):
    class Meta:
        model = InternshipPlacement
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class WeeklyLogSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source="student.get_full_name", read_only=True)
    company_name = serializers.CharField(source="placement.company_name", read_only=True)

    class Meta:
        model = WeeklyLog
        fields = "__all__"
        read_only_fields = (
            "student",
            "status",
            "submitted_at",
            "reviewed_at",
            "approved_at",
            "created_at",
            "updated_at",
        )

    def create(self, validated_data):
        validated_data["student"] = self.context["request"].user
        return super().create(validated_data)


class WeeklyLogStatusSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=WeeklyLogState.choices)
    supervisor_comment = serializers.CharField(required=False, allow_blank=True)


class EvaluationCriteriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluationCriteria
        fields = "__all__"


class EvaluationSerializer(serializers.ModelSerializer):
    evaluator_name = serializers.CharField(source="evaluator.get_full_name", read_only=True)

    class Meta:
        model = Evaluation
        fields = "__all__"
        read_only_fields = ("evaluator", "final_score", "created_at", "updated_at")

    def create(self, validated_data):
        validated_data["evaluator"] = self.context["request"].user
        return super().create(validated_data)
