from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.database import get_db
from app.schemas.notification import (
    NotificationResponse,
)
from app.services.notification_service import (
    NotificationService,
)


router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)


@router.get(
    "/",
    response_model=list[NotificationResponse],
)
def get_notifications(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return NotificationService.get_notifications(
        db=db,
        company_id=current_user.company_id,
        user_id=current_user.id,
    )


@router.get(
    "/unread-count",
    response_model=int,
)
def get_unread_count(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return NotificationService.get_unread_count(
        db=db,
        company_id=current_user.company_id,
        user_id=current_user.id,
    )


@router.patch(
    "/{notification_id}/read",
    response_model=NotificationResponse,
)
def mark_notification_as_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return NotificationService.mark_as_read(
        db=db,
        company_id=current_user.company_id,
        user_id=current_user.id,
        notification_id=notification_id,
    )


@router.patch(
    "/read-all",
    response_model=int,
)
def mark_all_notifications_as_read(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return NotificationService.mark_all_as_read(
        db=db,
        company_id=current_user.company_id,
        user_id=current_user.id,
    )