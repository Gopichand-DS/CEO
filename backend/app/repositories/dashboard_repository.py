from sqlalchemy.orm import Session

from app.repositories.employee_repository import EmployeeRepository
from app.repositories.project_repository import ProjectRepository
from app.services.task_service import TaskService


class DashboardRepository:

    # --------------------------------------------------
    # Employees
    # --------------------------------------------------

    @staticmethod
    def get_employee_summary(
        db: Session,
        company_id: int,
    ):

        employees = EmployeeRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        total = len(employees)

        active = sum(
            1
            for employee in employees
            if getattr(employee, "status", "").upper() == "ACTIVE"
        )

        return {
            "employees": employees,
            "total": total,
            "active": active,
        }

    # --------------------------------------------------
    # Projects
    # --------------------------------------------------

    @staticmethod
    def get_project_summary(
        db: Session,
        company_id: int,
    ):

        projects = ProjectRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        total = len(projects)

        active = sum(
            1
            for project in projects
            if project.status == "ACTIVE"
        )

        completed = sum(
            1
            for project in projects
            if project.status == "COMPLETED"
        )

        planned = sum(
            1
            for project in projects
            if project.status == "PLANNED"
        )

        return {
            "projects": projects,
            "total": total,
            "active": active,
            "completed": completed,
            "planned": planned,
        }

    # --------------------------------------------------
    # Tasks
    # --------------------------------------------------

    @staticmethod
    def get_task_summary(
        db: Session,
        projects,
        company_id: int,
    ):

        total_tasks = 0
        completed_tasks = 0
        pending_tasks = 0
        overdue_tasks = 0

        for project in projects:

            summary = TaskService.get_project_task_summary(
                db=db,
                project_id=project.id,
                company_id=company_id,
            )

            total_tasks += summary["total_tasks"]
            completed_tasks += summary["completed_tasks"]
            pending_tasks += summary["pending_tasks"]
            overdue_tasks += summary["overdue_tasks"]

        return {
            "total": total_tasks,
            "completed": completed_tasks,
            "pending": pending_tasks,
            "overdue": overdue_tasks,
        }