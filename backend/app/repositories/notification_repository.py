from sqlalchemy.orm import Session

from app.models.notification import Notification


class NotificationRepository:

    @staticmethod
    def create(
        db: Session,
        notification: Notification,
    ) -> Notification:
        db.add(notification)
        db.flush()
        db.refresh(notification)

        return notification

    @staticmethod
    def get_by_id(
        db: Session,
        notification_id: int,
        company_id: int,
    ) -> Notification | None:
        return (
            db.query(Notification)
            .filter(
                Notification.id == notification_id,
                Notification.company_id == company_id,
            )
            .first()
        )

    @staticmethod
    def get_all(
        db: Session,
        company_id: int,
        user_id: int | None = None,
    ) -> list[Notification]:

        query = (
            db.query(Notification)
            .filter(
                Notification.company_id == company_id,
            )
        )

        if user_id is not None:
            query = query.filter(
                (Notification.user_id == user_id)
                | (Notification.user_id.is_(None))
            )

        return (
            query
            .order_by(Notification.created_at.desc())
            .all()
        )

    @staticmethod
    def get_unread_count(
        db: Session,
        company_id: int,
        user_id: int | None = None,
    ) -> int:

        query = (
            db.query(Notification)
            .filter(
                Notification.company_id == company_id,
                Notification.is_read.is_(False),
            )
        )

        if user_id is not None:
            query = query.filter(
                (Notification.user_id == user_id)
                | (Notification.user_id.is_(None))
            )

        return query.count()

    @staticmethod
    def mark_as_read(
        db: Session,
        notification: Notification,
    ) -> Notification:

        notification.is_read = True

        db.flush()
        db.refresh(notification)

        return notification

    @staticmethod
    def mark_all_as_read(
        db: Session,
        company_id: int,
        user_id: int,
    ) -> int:

        notifications = (
            db.query(Notification)
            .filter(
                Notification.company_id == company_id,
                Notification.is_read.is_(False),
                (
                    (Notification.user_id == user_id)
                    | (Notification.user_id.is_(None))
                ),
            )
            .all()
        )

        for notification in notifications:
            notification.is_read = True

        db.flush()

        return len(notifications)