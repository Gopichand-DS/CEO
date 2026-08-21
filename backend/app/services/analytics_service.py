from sqlalchemy.orm import Session

from app.repositories.analytics_repository import AnalyticsRepository
from app.schemas.analytics import (
    ProjectAnalytics,
    TaskAnalytics,
    EmployeeAnalytics,
    WorkflowAnalytics,
    AIAnalytics,
    DashboardAnalytics,
)


class AnalyticsService:

    # -----------------------------
    # Project Analytics
    # -----------------------------
    @staticmethod
    def get_project_analytics(
        db: Session,
        company_id: int,
    ) -> ProjectAnalytics:

        data = AnalyticsRepository.get_project_analytics(
            db,
            company_id,
        )

        return ProjectAnalytics(**data)

    # -----------------------------
    # Task Analytics
    # -----------------------------
    @staticmethod
    def get_task_analytics(
        db: Session,
        company_id: int,
    ) -> TaskAnalytics:

        data = AnalyticsRepository.get_task_analytics(
            db,
            company_id,
        )

        return TaskAnalytics(**data)

    # -----------------------------
    # Employee Analytics
    # -----------------------------
    @staticmethod
    def get_employee_analytics(
        db: Session,
        company_id: int,
    ) -> EmployeeAnalytics:

        data = AnalyticsRepository.get_employee_analytics(
            db,
            company_id,
        )

        return EmployeeAnalytics(**data)

    # -----------------------------
    # Workflow Analytics
    # -----------------------------
    @staticmethod
    def get_workflow_analytics(
        db: Session,
        company_id: int,
    ) -> WorkflowAnalytics:

        data = AnalyticsRepository.get_workflow_analytics(
            db,
            company_id,
        )

        return WorkflowAnalytics(**data)

    # -----------------------------
    # AI Analytics
    # -----------------------------
    @staticmethod
    def get_ai_analytics(
        db: Session,
        company_id: int,
    ) -> AIAnalytics:

        data = AnalyticsRepository.get_ai_analytics(
            db,
            company_id,
        )

        return AIAnalytics(**data)

    # -----------------------------
    # Dashboard Analytics
    # -----------------------------
    @staticmethod
    def get_dashboard_analytics(
        db: Session,
        company_id: int,
    ) -> DashboardAnalytics:

        return DashboardAnalytics(
            projects=AnalyticsService.get_project_analytics(
                db,
                company_id,
            ),
            tasks=AnalyticsService.get_task_analytics(
                db,
                company_id,
            ),
            employees=AnalyticsService.get_employee_analytics(
                db,
                company_id,
            ),
            workflows=AnalyticsService.get_workflow_analytics(
                db,
                company_id,
            ),
            ai=AnalyticsService.get_ai_analytics(
                db,
                company_id,
            ),
        )