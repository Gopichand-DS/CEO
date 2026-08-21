from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.database import get_db

from app.models.user import User

from app.schemas.executive_analytics import ExecutiveAnalytics
from app.services.executive_analytics_service import (
    ExecutiveAnalyticsService,
)

router = APIRouter(
    prefix="/executive-analytics",
    tags=["Executive Analytics"],
)


@router.get(
    "/dashboard",
    response_model=ExecutiveAnalytics,
)
def get_executive_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return ExecutiveAnalyticsService.get_executive_dashboard(
        db=db,
        company_id=current_user.company_id,
    )