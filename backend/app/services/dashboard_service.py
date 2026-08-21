from sqlalchemy.orm import Session
from app.services.task_service import TaskService
from app.repositories.dashboard_repository import DashboardRepository
from app.repositories.task_repository import TaskRepository
from app.schemas.dashboard import (
    DashboardSummary,
    EmployeeSummary,
    ProjectSummary,
    TaskSummary,
)
from app.repositories.finance_repository import (
    FinanceRepository,
)


from app.schemas.dashboard import (
    DashboardOverviewResponse,
    KPIResponse,
    CompanyHealth,
    ExecutiveMetric,
    EmployeeOverview,
    EmployeeDepartment,
    DepartmentPerformance,
    ProjectStatus,
)
from app.repositories.department_dashboard_repository import DepartmentDashboardRepository
from app.repositories.project_dashboard_repository import ProjectDashboardRepository
from app.repositories.employee_dashboard_repository import EmployeeDashboardRepository


class DashboardService:

    @staticmethod
    def get_summary(
        db: Session,
        company_id: int,
    ) -> DashboardSummary:

        # -----------------------------
        # Employees
        # -----------------------------
        employee_summary = DashboardRepository.get_employee_summary(
           db=db,
           company_id=company_id,
        )

        employees = employee_summary["employees"]

        total_employees = employee_summary["total"]

        active_employees = employee_summary["active"]
        # -----------------------------
        # Projects
        # -----------------------------
        project_summary = DashboardRepository.get_project_summary(
           db=db,
           company_id=company_id,
        )

        projects = project_summary["projects"]

        total_projects = project_summary["total"]

        active_projects = project_summary["active"]

        completed_projects = project_summary["completed"]

        planned_projects = project_summary["planned"]
        # -----------------------------
        # Tasks
        # -----------------------------
        task_summary = DashboardRepository.get_task_summary(
           db=db,
           projects=projects,
           company_id=company_id,
        )

        total_tasks = task_summary["total"]

        completed_tasks = task_summary["completed"]

        pending_tasks = task_summary["pending"]

        overdue_tasks = task_summary["overdue"]

        # -----------------------------
        # Percentages
        # -----------------------------
        task_completion_percentage = 0.0

        if total_tasks:
            task_completion_percentage = round(
                (completed_tasks / total_tasks) * 100,
                2,
            )

        project_completion_percentage = 0.0

        if total_projects:
            project_completion_percentage = round(
                (completed_projects / total_projects) * 100,
                2,
            )

        # -----------------------------
        # Health Score
        # -----------------------------
        health_score = round(
            (
                task_completion_percentage +
                project_completion_percentage
            ) / 2,
            2,
        )

        return DashboardSummary(
            employees=EmployeeSummary(
                employees=employees,
                total=total_employees,
                active=active_employees,
            ),
            projects=ProjectSummary(
                total=total_projects,
                active=active_projects,
                completed=completed_projects,
                planned=planned_projects,
            ),
            tasks=TaskSummary(
                total=total_tasks,
                completed=completed_tasks,
                pending=pending_tasks,
                overdue=overdue_tasks,
            ),
            task_completion_percentage=task_completion_percentage,
            project_completion_percentage=project_completion_percentage,
            health_score=health_score,
        )

    @staticmethod
    def get_overview(
        db: Session,
        company_id: int,
    ) -> DashboardOverviewResponse:

        summary = DashboardService.get_summary(
            db=db,
            company_id=company_id,
        )

        employee_overview = (
            EmployeeDashboardRepository.get_employee_overview(
                db=db,
                company_id=company_id,
            )
        )

        department_performance = (
            DepartmentDashboardRepository.get_department_performance(
                db=db,
                company_id=company_id,
            )
        )

        project_status = (
            ProjectDashboardRepository.get_project_status(
                db=db,
                company_id=company_id,
            )
        )

        active_percentage = 0

        if summary.employees.total:
            active_percentage = round(
                (
                    summary.employees.active
                    / summary.employees.total
                )
                * 100,
                2,
            )

        company_health = CompanyHealth(
            overall_score=summary.health_score,
            financial_health=0,
            employee_health=active_percentage,
            operational_health=summary.project_completion_percentage,
            customer_health=0,
        )

        executive_metrics = [
            ExecutiveMetric(
                title="Task Completion",
                value=f"{summary.tasks.completed}/{summary.tasks.total}",
                trend=f"{summary.task_completion_percentage}%",
                status="positive",
            ),
            ExecutiveMetric(
                title="Project Completion",
                value=f"{summary.projects.completed}/{summary.projects.total}",
                trend=f"{summary.project_completion_percentage}%",
                status="positive",
            ),
        ]

        employee = EmployeeOverview(
            total_employees=employee_overview["total_employees"],
            active_employees=employee_overview["active_employees"],
            on_leave=employee_overview["on_leave"],
            new_joinees=employee_overview["new_joinees"],
            departments=[
                EmployeeDepartment(**department)
                for department in employee_overview["departments"]
            ],
        )

        finance = FinanceRepository.get_financial_summary(
                        db=db,
                        company_id=company_id,
                    )
        
        
        return DashboardOverviewResponse(
            kpis=KPIResponse(
            revenue=finance["revenue"],
            activities=[],
            profit=finance["profit"],
            employees=summary.employees.total,
            projects=summary.projects.total,
            ),
            revenue_chart=[],
            alerts=[],
            company_health=company_health,
            executive_metrics=executive_metrics,
            approvals=[],
            ai_summary="Dashboard overview generated successfully.",
            department_performance=[
                DepartmentPerformance(**department)
                for department in department_performance
            ],
            project_status=[
                ProjectStatus(**project)
                for project in project_status
            ],

            employee_overview=employee,
        )