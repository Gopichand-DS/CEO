from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.notification import Notification
from app.repositories.notification_repository import (
    NotificationRepository,
)
from app.schemas.notification import (
    NotificationCreate,
    NotificationResponse,
)


class NotificationService:

    @staticmethod
    def create_notification(
        db: Session,
        company_id: int,
        data: NotificationCreate,
    ) -> NotificationResponse:

        notification = Notification(
            company_id=company_id,
            user_id=data.user_id,
            title=data.title,
            message=data.message,
            notification_type=data.notification_type,
            priority=data.priority,
            is_read=False,
        )

        NotificationRepository.create(
            db=db,
            notification=notification,
        )

        db.commit()
        db.refresh(notification)

        return NotificationResponse.model_validate(
            notification
        )

    @staticmethod
    def get_notifications(
        db: Session,
        company_id: int,
        user_id: int,
    ) -> list[NotificationResponse]:

        notifications = NotificationRepository.get_all(
            db=db,
            company_id=company_id,
            user_id=user_id,
        )

        return [
            NotificationResponse.model_validate(
                notification
            )
            for notification in notifications
        ]

    @staticmethod
    def get_unread_count(
        db: Session,
        company_id: int,
        user_id: int,
    ) -> int:

        return NotificationRepository.get_unread_count(
            db=db,
            company_id=company_id,
            user_id=user_id,
        )

    @staticmethod
    def mark_as_read(
        db: Session,
        company_id: int,
        user_id: int,
        notification_id: int,
    ) -> NotificationResponse:

        notification = NotificationRepository.get_by_id(
            db=db,
            notification_id=notification_id,
            company_id=company_id,
        )

        if notification is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Notification not found",
            )

        # User-specific notifications can only be marked
        # as read by their intended user.
        if (
            notification.user_id is not None
            and notification.user_id != user_id
        ):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You cannot access this notification",
            )

        NotificationRepository.mark_as_read(
            db=db,
            notification=notification,
        )

        db.commit()
        db.refresh(notification)

        return NotificationResponse.model_validate(
            notification
        )

    @staticmethod
    def mark_all_as_read(
        db: Session,
        company_id: int,
        user_id: int,
    ) -> int:

        count = NotificationRepository.mark_all_as_read(
            db=db,
            company_id=company_id,
            user_id=user_id,
        )

        db.commit()

        return count