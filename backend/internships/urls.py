from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    DashboardStatsView,
    EvaluationCriteriaViewSet,
    EvaluationViewSet,
    InternshipPlacementViewSet,
    WeeklyLogViewSet,
)

router = DefaultRouter()
router.register("placements", InternshipPlacementViewSet, basename="placements")
router.register("weekly-logs", WeeklyLogViewSet, basename="weekly-logs")
router.register("criteria", EvaluationCriteriaViewSet, basename="criteria")
router.register("evaluations", EvaluationViewSet, basename="evaluations")

urlpatterns = [
    path("", include(router.urls)),
    path("dashboard/stats/", DashboardStatsView.as_view(), name="dashboard-stats"),
]
