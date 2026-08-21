from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.project_repository import ProjectRepository
from app.repositories.employee_repository import EmployeeRepository
from app.models.task import Task
from app.repositories.task_repository import TaskRepository
from app.schemas.task import TaskCreate, TaskUpdate


class TaskService:

    # ---------------------------------------------------------
    # CREATE
    # ---------------------------------------------------------

    @staticmethod
    def create_task(
        db: Session,
        task: TaskCreate,
        company_id: int,
        created_by: int,
    ):
        # ---------------------------------------------------------
        # VERIFY PROJECT BELONGS TO COMPANY
        # ---------------------------------------------------------

        project = ProjectRepository.get_by_id(
            db=db,
            project_id=task.project_id,
            company_id=company_id,
        )

        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found",
            )

        # ---------------------------------------------------------
        # VERIFY ASSIGNED EMPLOYEE BELONGS TO COMPANY
        # ---------------------------------------------------------

        if task.assigned_to is not None:
            employee = EmployeeRepository.get_by_id(
                db=db,
                employee_id=task.assigned_to,
                company_id=company_id,
            )

            if not employee:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Assigned employee not found",
                )

        # ---------------------------------------------------------
        # CREATE TASK
        # ---------------------------------------------------------

        db_task = Task(
            company_id=company_id,
            project_id=task.project_id,
            assigned_to=task.assigned_to,
            created_by=created_by,
            updated_by=created_by,
            title=task.title,
            description=task.description,
            status=task.status,
            priority=task.priority,
            start_date=task.start_date,
            due_date=task.due_date,
            estimated_hours=task.estimated_hours,
            actual_hours=task.actual_hours,
        )

        return TaskRepository.create(
            db=db,
            task=db_task,
        )

    # ---------------------------------------------------------
    # GET ALL
    # ---------------------------------------------------------

    @staticmethod
    def get_tasks(
        db: Session,
        company_id: int,
    ):
        return TaskRepository.get_all(
            db=db,
            company_id=company_id,
        )

    # ---------------------------------------------------------
    # GET BY ID
    # ---------------------------------------------------------

    @staticmethod
    def get_task(
        db: Session,
        task_id: int,
        company_id: int,
    ):
        task = TaskRepository.get_by_id(
            db=db,
            task_id=task_id,
            company_id=company_id,
        )

        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found",
            )

        return task

    # ---------------------------------------------------------
    # UPDATE
    # ---------------------------------------------------------

    @staticmethod
    def update_task(
        db: Session,
        task_id: int,
        task: TaskUpdate,
        updated_by: int,
        company_id: int,
    ):

        db_task = TaskRepository.get_by_id(
            db=db,
            task_id=task_id,
            company_id=company_id,
        )

        if not db_task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found",
            )

        db_task.updated_by = updated_by

        return TaskRepository.update(
            db=db,
            db_task=db_task,
            task=task,
        )

    # ---------------------------------------------------------
    # DELETE
    # ---------------------------------------------------------

    @staticmethod
    def delete_task(
        db: Session,
        task_id: int,
        company_id: int,
    ):

        db_task = TaskRepository.get_by_id(
            db=db,
            task_id=task_id,
            company_id=company_id,
        )

        if not db_task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found",
            )

        return TaskRepository.delete(
            db=db,
            db_task=db_task,
        )

    # ---------------------------------------------------------
    # PROJECT TASK SUMMARY
    # ---------------------------------------------------------

    @staticmethod
    def get_project_task_summary(
        db: Session,
        project_id: int,
        company_id: int,
        
    ):

        total = TaskRepository.get_total_tasks(
            db=db,
            project_id=project_id,
            company_id=company_id,
        )

        completed = TaskRepository.get_completed_tasks(
            db=db,
            project_id=project_id,
            company_id=company_id,
        )

        in_progress = TaskRepository.get_in_progress_tasks(
            db=db,
            project_id=project_id,
            company_id=company_id,
        )

        pending = TaskRepository.get_pending_tasks(
            db=db,
            project_id=project_id,
            company_id=company_id,
        )

        overdue = TaskRepository.get_overdue_tasks(
            db=db,
            project_id=project_id,
            company_id=company_id,
        )

        completion_percentage = 0

        if total > 0:
            completion_percentage = round(
                (completed / total) * 100,
                2,
            )

        return {
            "total_tasks": total,
            "completed_tasks": completed,
            "in_progress_tasks": in_progress,
            "pending_tasks": pending,
            "overdue_tasks": len(overdue),
            "completion_percentage": completion_percentage,
            "overdue_task_list": overdue,
        }