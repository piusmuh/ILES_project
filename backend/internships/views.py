from django.contrib.auth import get_user_model
from django.db.models import Avg, Count, Q
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.permissions import IsAdminRole, IsAnySupervisor, IsStudent
from .models import Evaluation, EvaluationCriteria, InternshipPlacement, WeeklyLog
from .serializers import (
    EvaluationCriteriaSerializer,
    EvaluationSerializer,
    InternshipPlacementSerializer,
    WeeklyLogSerializer,
    WeeklyLogStatusSerializer,
)
from .services import notify_user

User = get_user_model()


class InternshipPlacementViewSet(viewsets.ModelViewSet):
    queryset = InternshipPlacement.objects.select_related("student", "workplace_supervisor", "academic_supervisor")
    serializer_class = InternshipPlacementSerializer

    def get_permissions(self):
        if self.action in {"list", "retrieve"}:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated(), IsAdminRole()]

    def get_queryset(self):
        user = self.request.user
        queryset = super().get_queryset()
        if user.role == "Student":
            return queryset.filter(student=user)
        if user.role == "WorkplaceSupervisor":
            return queryset.filter(workplace_supervisor=user)
        if user.role == "AcademicSupervisor":
            return queryset.filter(academic_supervisor=user)
        return queryset


class WeeklyLogViewSet(viewsets.ModelViewSet):
    queryset = WeeklyLog.objects.select_related("student", "placement")
    serializer_class = WeeklyLogSerializer
    filterset_fields = ("status", "week_number")
    search_fields = ("title", "activities", "student__username")
    ordering_fields = ("created_at", "week_number", "due_date")

    def get_queryset(self):
        user = self.request.user
        queryset = super().get_queryset()
        if user.role == "Student":
            return queryset.filter(student=user)
        if user.role == "WorkplaceSupervisor":
            return queryset.filter(placement__workplace_supervisor=user)
        if user.role == "AcademicSupervisor":
            return queryset.filter(placement__academic_supervisor=user)
        return queryset

    def get_permissions(self):
        if self.action in {"create"}:
            return [permissions.IsAuthenticated(), IsStudent()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

    @action(detail=True, methods=["patch"], permission_classes=[permissions.IsAuthenticated])
    def transition(self, request, pk=None):
        weekly_log = self.get_object()
        serializer = WeeklyLogStatusSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        new_status = serializer.validated_data["status"]
        acting_user = request.user

        if acting_user.role == "Student":
            if weekly_log.student != acting_user:
                return Response({"detail": "Not allowed."}, status=status.HTTP_403_FORBIDDEN)
            if new_status != "Submitted":
                return Response({"detail": "Students can only submit logs."}, status=status.HTTP_403_FORBIDDEN)

        if acting_user.role in {"WorkplaceSupervisor", "AcademicSupervisor"}:
            if acting_user.role == "WorkplaceSupervisor" and weekly_log.placement.workplace_supervisor_id != acting_user.id:
                return Response({"detail": "Not assigned to this student."}, status=status.HTTP_403_FORBIDDEN)
            if acting_user.role == "AcademicSupervisor" and weekly_log.placement.academic_supervisor_id != acting_user.id:
                return Response({"detail": "Not assigned to this student."}, status=status.HTTP_403_FORBIDDEN)
            if new_status not in {"Reviewed", "Approved", "Draft", "Rejected"}:
                return Response({"detail": "Invalid supervisor transition."}, status=status.HTTP_400_BAD_REQUEST)

        if acting_user.role == "Admin" and new_status not in {"Reviewed", "Approved", "Draft", "Rejected"}:
            return Response({"detail": "Invalid admin transition."}, status=status.HTTP_400_BAD_REQUEST)

        weekly_log.supervisor_comment = serializer.validated_data.get("supervisor_comment", weekly_log.supervisor_comment)
        weekly_log.transition_to(new_status)

        notify_user(
            weekly_log.student,
            "Weekly Log Updated",
            f"Your week {weekly_log.week_number} log is now {weekly_log.status}.",
        )
        return Response(WeeklyLogSerializer(weekly_log).data)


class EvaluationCriteriaViewSet(viewsets.ModelViewSet):
    queryset = EvaluationCriteria.objects.all()
    serializer_class = EvaluationCriteriaSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminRole]


class EvaluationViewSet(viewsets.ModelViewSet):
    queryset = Evaluation.objects.select_related("weekly_log", "evaluator")
    serializer_class = EvaluationSerializer

    def get_permissions(self):
        if self.action in {"create", "update", "partial_update"}:
            return [permissions.IsAuthenticated(), IsAnySupervisor()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        queryset = super().get_queryset()
        if user.role == "Student":
            return queryset.filter(weekly_log__student=user)
        return queryset

    def perform_create(self, serializer):
        evaluation = serializer.save(evaluator=self.request.user)
        notify_user(
            evaluation.weekly_log.student,
            "Evaluation Added",
            f"A new evaluation has been posted for week {evaluation.weekly_log.week_number}.",
        )


class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        logs = WeeklyLog.objects.all()
        if user.role == "Student":
            logs = logs.filter(student=user)
        elif user.role == "WorkplaceSupervisor":
            logs = logs.filter(placement__workplace_supervisor=user)
        elif user.role == "AcademicSupervisor":
            logs = logs.filter(placement__academic_supervisor=user)
        data = {
            "total_logs": logs.count(),
            "submitted_logs": logs.filter(status="Submitted").count(),
            "approved_logs": logs.filter(status="Approved").count(),
            "rejected_logs": logs.filter(status="Rejected").count(),
            "average_score": Evaluation.objects.filter(weekly_log__in=logs).aggregate(avg=Avg("final_score"))["avg"] or 0,
            "students_tracked": InternshipPlacement.objects.filter(
                Q(workplace_supervisor=user) | Q(academic_supervisor=user)
            ).aggregate(total=Count("student", distinct=True))["total"]
            if user.role in {"WorkplaceSupervisor", "AcademicSupervisor"}
            else 0,
        }
        return Response(data)
