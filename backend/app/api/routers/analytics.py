from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import get_current_user

from app.models.user import User

from app.schemas.analytics import (
    DashboardAnalytics,
    ProjectAnalytics,
    TaskAnalytics,
    EmployeeAnalytics,
    WorkflowAnalytics,
    AIAnalytics,
)

from app.services.analytics_service import AnalyticsService


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


# -----------------------------------
# Dashboard Analytics
# -----------------------------------
@router.get(
    "/dashboard",
    response_model=DashboardAnalytics,
)
def get_dashboard_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return AnalyticsService.get_dashboard_analytics(
        db=db,
        company_id=current_user.company_id,
    )


# -----------------------------------
# Project Analytics
# -----------------------------------
@router.get(
    "/projects",
    response_model=ProjectAnalytics,
)
def get_project_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return AnalyticsService.get_project_analytics(
        db=db,
        company_id=current_user.company_id,
    )


# -----------------------------------
# Task Analytics
# -----------------------------------
@router.get(
    "/tasks",
    response_model=TaskAnalytics,
)
def get_task_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return AnalyticsService.get_task_analytics(
        db=db,
        company_id=current_user.company_id,
    )


# -----------------------------------
# Employee Analytics
# -----------------------------------
@router.get(
    "/employees",
    response_model=EmployeeAnalytics,
)
def get_employee_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return AnalyticsService.get_employee_analytics(
        db=db,
        company_id=current_user.company_id,
    )


# -----------------------------------
# Workflow Analytics
# -----------------------------------
@router.get(
    "/workflows",
    response_model=WorkflowAnalytics,
)
def get_workflow_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return AnalyticsService.get_workflow_analytics(
        db=db,
        company_id=current_user.company_id,
    )


# -----------------------------------
# AI Analytics
# -----------------------------------
@router.get(
    "/ai",
    response_model=AIAnalytics,
)
def get_ai_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return AnalyticsService.get_ai_analytics(
        db=db,
        company_id=current_user.company_id,
    )