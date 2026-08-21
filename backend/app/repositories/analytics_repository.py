from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.task import Task, TaskPriority, TaskStatus
from app.models.employee import Employee
from app.models.workflow import Workflow
from app.models.workflow_instance import WorkflowInstance


class AnalyticsRepository:

    # -----------------------------
    # Project Analytics
    # -----------------------------
    @staticmethod
    def get_project_analytics(
        db: Session,
        company_id: int,
    ):

        total_projects = (
            db.query(func.count(Project.id))
            .filter(Project.company_id == company_id)
            .scalar()
            or 0
        )

        planned_projects = (
            db.query(func.count(Project.id))
            .filter(
                Project.company_id == company_id,
                Project.status == "PLANNED",
            )
            .scalar()
            or 0
        )

        active_projects = (
            db.query(func.count(Project.id))
            .filter(
                Project.company_id == company_id,
                Project.status == "IN_PROGRESS",
            )
            .scalar()
            or 0
        )

        completed_projects = (
            db.query(func.count(Project.id))
            .filter(
                Project.company_id == company_id,
                Project.status == "COMPLETED",
            )
            .scalar()
            or 0
        )

        delayed_projects = (
            db.query(func.count(Project.id))
            .filter(
                Project.company_id == company_id,
                Project.status != "COMPLETED",
                Project.end_date.isnot(None),
                Project.end_date < func.current_date(),
            )
            .scalar()
            or 0
        )

        total_tasks = (
            db.query(func.count(Task.id))
            .join(Project)
            .filter(Project.company_id == company_id)
            .scalar()
            or 0
        )

        completed_tasks = (
            db.query(func.count(Task.id))
            .join(Project)
            .filter(
                Project.company_id == company_id,
                Task.status == TaskStatus.DONE,
            )
            .scalar()
            or 0
        )

        average_progress = (
            round((completed_tasks / total_tasks) * 100, 2)
            if total_tasks
            else 0
        )

        completion_rate = (
            round((completed_projects / total_projects) * 100, 2)
            if total_projects
            else 0
        )

        overdue_percentage = (
            round((delayed_projects / total_projects) * 100, 2)
            if total_projects
            else 0
        )

        high_risk_projects = delayed_projects

        in_review_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.status == TaskStatus.IN_REVIEW,
                Task.is_deleted == False,
            )
            .scalar()
            or 0
        )

        blocked_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.status == TaskStatus.BLOCKED,
                Task.is_deleted == False,
            )
            .scalar()
            or 0
        )

        on_hold_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.status == TaskStatus.ON_HOLD,
                Task.is_deleted == False,
            )
            .scalar()
            or 0
        )

        cancelled_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.status == TaskStatus.CANCELLED,
                Task.is_deleted == False,
            )
            .scalar()
            or 0
        )

        critical_priority_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.priority == TaskPriority.CRITICAL,
                Task.is_deleted == False,
            )
            .scalar()
            or 0
        )

        return {
            "total_projects": total_projects,
            "active_projects": active_projects,
            "completed_projects": completed_projects,
            "planned_projects": planned_projects,
            "delayed_projects": delayed_projects,
            "average_progress": average_progress,
            "completion_rate": completion_rate,
            "overdue_percentage": overdue_percentage,
            "high_risk_projects": high_risk_projects,
            "in_review_tasks": in_review_tasks,
            "blocked_tasks": blocked_tasks,
            "on_hold_tasks": on_hold_tasks,
            "cancelled_tasks": cancelled_tasks,
            "critical_priority_tasks": critical_priority_tasks,
        }
    # -----------------------------
    # Task Analytics
    # -----------------------------
    @staticmethod
    def get_task_analytics(
        db: Session,
        company_id: int,
    ):

        total_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.is_deleted == False,
            )
            .scalar()
            or 0
        )

        pending_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.status == TaskStatus.TODO,
                Task.is_deleted == False,
            )
            .scalar()
            or 0
        )

        in_progress_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.status == TaskStatus.IN_PROGRESS,
                Task.is_deleted == False,
            )
            .scalar()
            or 0
        )

        completed_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.status == TaskStatus.DONE,
                Task.is_deleted == False,
            )
            .scalar()
            or 0
        )

        overdue_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.status != TaskStatus.DONE,
                Task.is_deleted == False,
                Task.due_date.isnot(None),
                Task.due_date < func.current_date(),
            )
            .scalar()
            or 0
        )

        high_priority_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.priority == TaskPriority.HIGH,
                Task.is_deleted == False,
            )
            .scalar()
            or 0
        )

        medium_priority_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.priority == TaskPriority.MEDIUM,
                Task.is_deleted == False,
            )
            .scalar()
            or 0
        )

        low_priority_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.priority == TaskPriority.LOW,
                Task.is_deleted == False,
            )
            .scalar()
            or 0
        )
        in_review_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.status == TaskStatus.IN_REVIEW,
                Task.is_deleted == False,
            )
            .scalar()
            or 0
        )

        blocked_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.status == TaskStatus.BLOCKED,
                Task.is_deleted == False,
            )
            .scalar()
            or 0
        )

        on_hold_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.status == TaskStatus.ON_HOLD,
                Task.is_deleted == False,
            )
            .scalar()
            or 0
        )

        cancelled_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.status == TaskStatus.CANCELLED,
                Task.is_deleted == False,
            )
            .scalar()
            or 0
        )

        critical_priority_tasks = (
            db.query(func.count(Task.id))
            .filter(
                Task.company_id == company_id,
                Task.priority == TaskPriority.CRITICAL,
                Task.is_deleted == False,
            )
            .scalar()
            or 0
        )

        completion_percentage = (
            round(
                (completed_tasks / total_tasks) * 100,
                2,
            )
            if total_tasks
            else 0
        )

        overdue_percentage = (
            round(
                (overdue_tasks / total_tasks) * 100,
                2,
            )
            if total_tasks
            else 0
        )

        return {
            "total_tasks": total_tasks,
            "pending_tasks": pending_tasks,
            "in_progress_tasks": in_progress_tasks,
            "completed_tasks": completed_tasks,
            "overdue_tasks": overdue_tasks,
            "completion_percentage": completion_percentage,
            "overdue_percentage": overdue_percentage,
            "high_priority_tasks": high_priority_tasks,
            "medium_priority_tasks": medium_priority_tasks,
            "critical_priority_tasks": critical_priority_tasks,
            "blocked_tasks": blocked_tasks,
            "on_hold_tasks": on_hold_tasks,
            "cancelled_tasks": cancelled_tasks,
            "in_review_tasks": in_review_tasks,
            "low_priority_tasks": low_priority_tasks,
        }
    # -----------------------------
    # Employee Analytics
    # -----------------------------
    @staticmethod
    def get_employee_analytics(
        db: Session,
        company_id: int,
    ):

        total_employees = (
            db.query(func.count(Employee.id))
            .filter(Employee.company_id == company_id)
            .scalar()
            or 0
        )

        active_employees = (
            db.query(func.count(Employee.id))
            .filter(
                Employee.company_id == company_id,
                Employee.status == "ACTIVE",
            )
            .scalar()
            or 0
        )

        inactive_employees = (
            db.query(func.count(Employee.id))
            .filter(
                Employee.company_id == company_id,
                Employee.status == "INACTIVE",
            )
            .scalar()
            or 0
        )

        new_employees = (
            db.query(func.count(Employee.id))
            .filter(
                Employee.company_id == company_id,
                Employee.joining_date >= (
                   func.current_date() - 30
                ),
            )
            .scalar()
            or 0
        )

        total_salary = (
            db.query(func.coalesce(func.sum(Employee.salary), 0))
            .filter(Employee.company_id == company_id)
            .scalar()
        )

        average_salary = (
            round(total_salary / total_employees, 2)
            if total_employees
            else 0
        )

        employee_utilization = (
            round(
                (active_employees / total_employees) * 100,
                2,
            )
            if total_employees
            else 0
        )

        return {
            "total_employees": total_employees,
            "active_employees": active_employees,
            "inactive_employees": inactive_employees,
            "new_employees": new_employees,
            "employee_utilization": employee_utilization,
            "average_salary": average_salary,
        }

    # -----------------------------
    # Workflow Analytics
    # -----------------------------
    @staticmethod
    def get_workflow_analytics(
        db: Session,
        company_id: int,
    ):
 
        total_workflows = (
            db.query(func.count(Workflow.id))
            .filter(
                Workflow.company_id == company_id,
            )
            .scalar()
            or 0
        )

        total_instances = (
            db.query(func.count(WorkflowInstance.id))
            .join(Workflow)
            .filter(
                Workflow.company_id == company_id,
            )
            .scalar()
            or 0
        )

        running_instances = (
            db.query(func.count(WorkflowInstance.id))
            .join(Workflow)
            .filter(
                Workflow.company_id == company_id,
                WorkflowInstance.status == "Running",
            )
            .scalar()
            or 0
        )

        completed_instances = (
            db.query(func.count(WorkflowInstance.id))
            .join(Workflow)
            .filter(
                Workflow.company_id == company_id,
                WorkflowInstance.status == "Completed",
            )
            .scalar()
            or 0
        )

        failed_instances = (
            db.query(func.count(WorkflowInstance.id))
            .join(Workflow)
            .filter(
                Workflow.company_id == company_id,
                WorkflowInstance.status == "Failed",
            )
            .scalar()
            or 0
        )

        pending_instances = (
            db.query(func.count(WorkflowInstance.id))
            .join(Workflow)
            .filter(
                Workflow.company_id == company_id,
                WorkflowInstance.status == "Pending",
            )
            .scalar()
            or 0
        )

        completion_rate = (
            round(
                (completed_instances / total_instances) * 100,
                2,
            )
            if total_instances
            else 0
        )

        failure_rate = (
            round(
                (failed_instances / total_instances) * 100,
                2,
            )
            if total_instances
            else 0
        )

        pending_rate = (
            round(
                (pending_instances / total_instances) * 100,
                2,
            )
            if total_instances
            else 0
        )

        workflow_health_score = round(
            (
                completion_rate
                +
                (100 - failure_rate)
            )
            / 2,
            2,
        )

        return {
            "total_workflows": total_workflows,
            "total_instances": total_instances,
            "running_instances": running_instances,
            "completed_instances": completed_instances,
            "failed_instances": failed_instances,
            "completion_rate": completion_rate,
            "failure_rate": failure_rate,
            "pending_rate": pending_rate,
            "pending_instances": pending_instances,
            "workflow_health_score": workflow_health_score,
        }
    # -----------------------------
    # AI Analytics (Placeholder)
    # -----------------------------
    @staticmethod
    def get_ai_analytics(db: Session, company_id: int):

        return {
            "total_requests": 0,
            "successful_requests": 0,
            "failed_requests": 0,
        }