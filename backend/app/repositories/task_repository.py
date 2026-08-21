from datetime import date

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.task import Task, TaskStatus
from app.schemas.task import TaskUpdate


class TaskRepository:

    # ---------------------------------------------------------
    # CREATE
    # ---------------------------------------------------------

    @staticmethod
    def create(
        db: Session,
        task: Task,
    ):
        db.add(task)
        db.commit()
        db.refresh(task)

        return task

    # ---------------------------------------------------------
    # GET ALL - TENANT SAFE
    # ---------------------------------------------------------

    @staticmethod
    def get_all(
        db: Session,
        company_id: int,
    ):
        return (
            db.query(Task)
            .filter(
                Task.company_id == company_id,
                Task.is_deleted == False,
            )
            .all()
        )

    # ---------------------------------------------------------
    # GET BY ID - TENANT SAFE
    # ---------------------------------------------------------

    @staticmethod
    def get_by_id(
        db: Session,
        task_id: int,
        company_id: int,
    ):
        return (
            db.query(Task)
            .filter(
                Task.id == task_id,
                Task.company_id == company_id,
                Task.is_deleted == False,
            )
            .first()
        )

    # ---------------------------------------------------------
    # UPDATE
    # ---------------------------------------------------------

    @staticmethod
    def update(
        db: Session,
        db_task: Task,
        task: TaskUpdate,
    ):
        update_data = task.model_dump(
            exclude_unset=True,
        )

        for key, value in update_data.items():
            setattr(db_task, key, value)

        db.commit()
        db.refresh(db_task)

        return db_task

    # ---------------------------------------------------------
    # SOFT DELETE
    # ---------------------------------------------------------

    @staticmethod
    def delete(
        db: Session,
        db_task: Task,
    ):
        db_task.is_deleted = True

        db.commit()
        db.refresh(db_task)

        return db_task

    # ---------------------------------------------------------
    # PROJECT TASK COUNTS
    # ---------------------------------------------------------

    @staticmethod
    def get_total_tasks(
        db: Session,
        project_id: int,
        company_id: int,
    ):
        return (
            db.query(func.count(Task.id))
            .filter(
                Task.project_id == project_id,
                Task.company_id == company_id,
                Task.is_deleted == False,
            )
            .scalar()
        )

    @staticmethod
    def get_completed_tasks(
        db: Session,
        project_id: int,
        company_id: int,
    ):
        return (
            db.query(func.count(Task.id))
            .filter(
                Task.project_id == project_id,
                Task.company_id == company_id,
                Task.status == TaskStatus.DONE,
                Task.is_deleted == False,
            )
            .scalar()
        )

    @staticmethod
    def get_in_progress_tasks(
        db: Session,
        project_id: int,
        company_id: int,
    ):
        return (
            db.query(func.count(Task.id))
            .filter(
                Task.project_id == project_id,
                Task.company_id == company_id,
                Task.status == TaskStatus.IN_PROGRESS,
                Task.is_deleted == False,
            )
            .scalar()
        )

    @staticmethod
    def get_pending_tasks(
        db: Session,
        project_id: int,
        company_id: int,
    ):
        return (
            db.query(func.count(Task.id))
            .filter(
                Task.project_id == project_id,
                Task.company_id == company_id,
                Task.status == TaskStatus.TODO,
                Task.is_deleted == False,
            )
            .scalar()
        )

    @staticmethod
    def get_overdue_tasks(
        db: Session,
        project_id: int,
        company_id: int,
    ):
        return (
            db.query(Task)
            .filter(
                Task.project_id == project_id,
                Task.company_id == company_id,
                Task.status != TaskStatus.DONE,
                Task.due_date.isnot(None),
                Task.due_date < date.today(),
                Task.is_deleted == False,
            )
            .all()
        )

    # ---------------------------------------------------------
    # COMPANY TASKS
    # ---------------------------------------------------------

    @staticmethod
    def get_all_by_company(
        db: Session,
        company_id: int,
    ):
        return (
            db.query(Task)
            .filter(
                Task.company_id == company_id,
                Task.is_deleted == False,
            )
            .all()
        )

    # ---------------------------------------------------------
    # TASK ANALYTICS
    # ---------------------------------------------------------

    @staticmethod
    def get_task_analytics(
        db: Session,
        company_id: int,
    ):

        tasks = TaskRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        total_tasks = len(tasks)

        todo_tasks = sum(
            1
            for task in tasks
            if task.status == TaskStatus.TODO
        )

        in_progress_tasks = sum(
            1
            for task in tasks
            if task.status == TaskStatus.IN_PROGRESS
        )

        in_review_tasks = sum(
            1
            for task in tasks
            if task.status == TaskStatus.IN_REVIEW
        )

        done_tasks = sum(
            1
            for task in tasks
            if task.status == TaskStatus.DONE
        )

        blocked_tasks = sum(
            1
            for task in tasks
            if task.status == TaskStatus.BLOCKED
        )

        on_hold_tasks = sum(
            1
            for task in tasks
            if task.status == TaskStatus.ON_HOLD
        )

        cancelled_tasks = sum(
            1
            for task in tasks
            if task.status == TaskStatus.CANCELLED
        )

        overdue_tasks = sum(
            1
            for task in tasks
            if (
                task.status != TaskStatus.DONE
                and task.due_date is not None
                and task.due_date < date.today()
            )
        )

        return {
            "total_tasks": total_tasks,
            "todo_tasks": todo_tasks,
            "in_progress_tasks": in_progress_tasks,
            "in_review_tasks": in_review_tasks,
            "done_tasks": done_tasks,
            "blocked_tasks": blocked_tasks,
            "on_hold_tasks": on_hold_tasks,
            "cancelled_tasks": cancelled_tasks,
            "overdue_tasks": overdue_tasks,
        }