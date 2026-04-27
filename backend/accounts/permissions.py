from rest_framework.permissions import BasePermission


class IsRole(BasePermission):
    allowed_roles = set()

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role in self.allowed_roles)


class IsStudent(IsRole):
    allowed_roles = {"Student"}


class IsWorkplaceSupervisor(IsRole):
    allowed_roles = {"WorkplaceSupervisor"}


class IsAcademicSupervisor(IsRole):
    allowed_roles = {"AcademicSupervisor"}


class IsAdminRole(IsRole):
    allowed_roles = {"Admin"}


class IsAnySupervisor(IsRole):
    allowed_roles = {"WorkplaceSupervisor", "AcademicSupervisor"}

