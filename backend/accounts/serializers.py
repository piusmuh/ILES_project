from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
            "role",
            "department",
            "staff_number",
            "student_number",
            "phone_number",
        )

    def validate_password(self, value):
        validate_password(value)
        return value

    def validate(self, attrs):
        # Optional unique fields should be stored as NULL, not empty strings,
        # so users can register without providing these values.
        for field in ("staff_number", "student_number", "phone_number", "department"):
            if attrs.get(field) == "":
                attrs[field] = None if field in ("staff_number", "student_number") else ""
        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "role",
            "department",
            "staff_number",
            "student_number",
            "phone_number",
        )
