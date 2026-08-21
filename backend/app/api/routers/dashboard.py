from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.database import get_db

from app.schemas.dashboard import (
    DashboardSummary,
    DashboardOverviewResponse,
)

from app.services.dashboard_service import DashboardService
from app.services.dashboard_ai_service import DashboardAIService


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/summary",
    response_model=DashboardSummary,
)
def get_dashboard_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return DashboardService.get_summary(
        db=db,
        company_id=current_user.company_id,
    )


@router.get("/ai-summary")
def get_dashboard_ai_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    dashboard = DashboardService.get_summary(
        db=db,
        company_id=current_user.company_id,
    )

    return DashboardAIService.generate_summary(
        dashboard=dashboard,
    )


@router.get(
    "/overview",
    response_model=DashboardOverviewResponse,
)
def get_dashboard_overview(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return DashboardService.get_overview(
        db=db,
        company_id=current_user.company_id,
    )