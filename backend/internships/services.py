from django.core.mail import send_mail

from notifications.models import Notification


def notify_user(user, title, message):
    Notification.objects.create(user=user, title=title, message=message, channel="in_app")
    if user.email:
        send_mail(
            subject=title,
            message=message,
            from_email=None,
            recipient_list=[user.email],
            fail_silently=True,
        )
