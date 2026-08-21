from sqlalchemy.orm import Session

from app.ai.sub_intent import AISubIntent
from app.repositories.task_repository import TaskRepository


class TaskAnalyzer:

    @staticmethod
    def analyze(
        db: Session,
        company_id: int,
        message: str,
        sub_intent: AISubIntent,
    ):

        if sub_intent == AISubIntent.TASK_LIST:
            return TaskAnalyzer.list_tasks(
                db=db,
                company_id=company_id,
            )

        if sub_intent == AISubIntent.TASK_OVERDUE:
            return TaskAnalyzer.overdue_tasks(
                db=db,
                company_id=company_id,
            )

        return {
            "message": "Task analysis not supported."
        }
    
    @staticmethod
    def list_tasks(
        db: Session,
        company_id: int,
    ):

        tasks = TaskRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        return {
            "total_tasks": len(tasks),
            "tasks": [
                {
                    "id": task.id,
                    "title": task.title,
                    "status": task.status,
                }
                for task in tasks
            ],
        }

    @staticmethod
    def overdue_tasks(
        db: Session,
        company_id: int,
    ):

        tasks = TaskRepository.get_overdue_by_company(
            db=db,
            company_id=company_id,
        )

        return {
            "overdue_tasks": len(tasks),
            "tasks": [
               {
                    "id": task.id,
                    "title": task.title,
                    "due_date": task.due_date,
                    "status": task.status,
                }
                for task in tasks
            ],
        }