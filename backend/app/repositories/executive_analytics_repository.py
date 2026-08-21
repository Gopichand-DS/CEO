from sqlalchemy.orm import Session

from app.services.analytics_service import AnalyticsService
from app.repositories.finance_repository import FinanceRepository


class ExecutiveAnalyticsRepository:

    @staticmethod
    def get_dashboard_data(
        db: Session,
        company_id: int,
    ):

        projects = AnalyticsService.get_project_analytics(
            db=db,
            company_id=company_id,
        )

        tasks = AnalyticsService.get_task_analytics(
            db=db,
            company_id=company_id,
        )

        employees = AnalyticsService.get_employee_analytics(
            db=db,
            company_id=company_id,
        )

        workflows = AnalyticsService.get_workflow_analytics(
            db=db,
            company_id=company_id,
        )

        ai = AnalyticsService.get_ai_analytics(
            db=db,
            company_id=company_id,
        )

        finance = FinanceRepository.get_financial_summary(
            db=db,
            company_id=company_id,
        )

        return {
            "projects": projects,
            "tasks": tasks,
            "employees": employees,
            "workflows": workflows,
            "ai": ai,
            "finance": finance,
        }