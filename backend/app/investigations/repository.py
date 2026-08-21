from sqlalchemy.orm import Session

from app.services.analytics_service import AnalyticsService
from app.services.executive_analytics_service import (
    ExecutiveAnalyticsService,
)


class InvestigationRepository:

    @staticmethod
    def collect_company_metrics(
        db: Session,
        company_id: int,
    ):

        return {
            "executive": ExecutiveAnalyticsService.get_executive_dashboard(
                db=db,
                company_id=company_id,
            ),
            "projects": AnalyticsService.get_project_analytics(
                db=db,
                company_id=company_id,
            ),
            "tasks": AnalyticsService.get_task_analytics(
                db=db,
                company_id=company_id,
            ),
            "employees": AnalyticsService.get_employee_analytics(
                db=db,
                company_id=company_id,
            ),
            "workflows": AnalyticsService.get_workflow_analytics(
                db=db,
                company_id=company_id,
            ),
        }