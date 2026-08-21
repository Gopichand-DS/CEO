from sqlalchemy.orm import Session

from app.repositories.executive_analytics_repository import (
    ExecutiveAnalyticsRepository,
)

from app.schemas.executive_analytics import (
    ExecutiveAnalytics,
    ExecutiveKPIs,
)


class ExecutiveAnalyticsService:

    @staticmethod
    def get_executive_dashboard(
        db: Session,
        company_id: int,
    ):

        data = ExecutiveAnalyticsRepository.get_dashboard_data(
            db=db,
            company_id=company_id,
        )

        projects = data["projects"]
        tasks = data["tasks"]
        employees = data["employees"]
        workflows = data["workflows"]
        ai = data["ai"]
        finance = data["finance"]

        company_health = round(
            (
                projects.completion_rate
                + tasks.completion_percentage
                + employees.employee_utilization
                + workflows.workflow_health_score
            ) / 4,
            2,
        )

        kpis = ExecutiveKPIs(
            revenue=finance["revenue"],
            profit=finance["profit"],
            active_projects=projects.active_projects,
            active_employees=employees.active_employees,
            completed_tasks=tasks.completed_tasks,
            company_health=company_health,
        )

        return ExecutiveAnalytics(
            kpis=kpis,
            projects=projects,
            tasks=tasks,
            employees=employees,
            workflows=workflows,
            ai_summary="Executive dashboard generated successfully.",
        )