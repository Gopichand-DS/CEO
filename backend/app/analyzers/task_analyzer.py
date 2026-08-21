from sqlalchemy.orm import Session
from app.models.task import TaskStatus
from app.ai.sub_intent import AISubIntent
from app.investigations.investigation_context import InvestigationContext
from app.investigations.investigation_result import InvestigationResult
from app.services.investigation_service import InvestigationService
from app.repositories.task_repository import TaskRepository
from datetime import date

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

        if sub_intent == AISubIntent.TASK_PROGRESS:
            return TaskAnalyzer.task_progress(
                db=db,
                company_id=company_id,
            )

        if sub_intent == AISubIntent.TASK_PENDING:
            return TaskAnalyzer.task_pending(
                db=db,
                company_id=company_id,
                question=message,
            )

        if sub_intent == AISubIntent.TASK_OVERDUE:
            return TaskAnalyzer.task_overdue(
                db=db,
                company_id=company_id,
                question=message,
            )

        if sub_intent == AISubIntent.TASK_WORKLOAD:
            return TaskAnalyzer.task_workload(
                db=db,
                company_id=company_id,
                question=message,
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
                    "status": task.status.value,
                    "priority": task.priority.value,
                }
                for task in tasks
            ],
        }

    @staticmethod
    def task_progress(
        db: Session,
        company_id: int,
    ):

        return TaskRepository.get_task_analytics(
            db=db,
            company_id=company_id,
        )

    @staticmethod
    def task_pending(
        db: Session,
        company_id: int,
        question: str,
    ):

        tasks = TaskRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        pending_tasks = [
            task
            for task in tasks
            if task.status == TaskStatus.TODO
        ]

        return {
            "investigation_type": "TASK_PENDING",
            "summary": f"{len(pending_tasks)} pending task(s) found.",
            "tasks": [
                {
                    "id": task.id,
                    "title": task.title,
                    "status": task.status.value,
                    "priority": task.priority.value,
                    "project_id": task.project_id,
                    "due_date": (
                        task.due_date.isoformat()
                        if task.due_date
                        else None
                    ),
                }
                for task in pending_tasks
            ],
        }

    @staticmethod
    def _task_pending(
        context: InvestigationContext,
    ):

        analytics = context.task_analytics

        findings = [
            f"Total tasks: {analytics['total_tasks']}",
            f"Pending tasks: {analytics['todo_tasks']}",
        ]

        recommendations = [
            "Review pending tasks with project managers.",
            "Prioritize high-impact pending tasks.",
        ]

        return InvestigationResult(
            investigation_type=context.investigation_type,
            summary="Pending task investigation completed.",
            findings=findings,
            recommendations=recommendations,
            confidence=0.92,
        )

    @staticmethod
    def task_overdue(
        db: Session,
        company_id: int,
        question: str,
    ):

        tasks = TaskRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        overdue_tasks = [
            task
            for task in tasks
            if (
                task.status != TaskStatus.DONE
                and task.due_date
                and task.due_date < date.today()
            )
        ]

        return {
            "investigation_type": "TASK_OVERDUE",
            "summary": f"{len(overdue_tasks)} overdue task(s) found.",
            "tasks": [
                {
                    "id": task.id,
                    "title": task.title,
                    "status": task.status.value,
                    "priority": task.priority.value,
                    "project_id": task.project_id,
                    "due_date": (
                        task.due_date.isoformat()
                        if task.due_date
                        else None
                    ),
                }
                for task in overdue_tasks
            ],
        }

    @staticmethod
    def _task_overdue(
        context: InvestigationContext,
    ):

        analytics = context.task_analytics

        findings = [
            f"Total tasks: {analytics['total_tasks']}",
            f"Overdue tasks: {analytics['overdue_tasks']}",
            f"Blocked tasks: {analytics['blocked_tasks']}",
        ]

        recommendations = [
            "Review overdue tasks immediately.",
            "Resolve blocked tasks to prevent further delays.",
            "Reassign overdue tasks if resources are unavailable.",
        ]

        return InvestigationResult(
            investigation_type=context.investigation_type,
            summary="Task overdue investigation completed.",
            findings=findings,
            recommendations=recommendations,
            confidence=0.94,
        )

    @staticmethod
    def task_workload(
        db: Session,
        company_id: int,
        question: str,
    ):

        tasks = TaskRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        return {
            "investigation_type": "TASK_WORKLOAD",
            "summary": f"{len(tasks)} task(s) found.",
            "tasks": [
                {
                    "id": task.id,
                    "title": task.title,
                    "status": task.status.value,
                    "priority": task.priority.value,
                    "project_id": task.project_id,
                    "due_date": (
                        task.due_date.isoformat()
                        if task.due_date
                        else None
                    ),
                }
                for task in tasks
            ],
        }
    @staticmethod
    def _task_workload(
        context: InvestigationContext,
    ):

        analytics = context.task_analytics

        findings = [
            f"Total tasks: {analytics['total_tasks']}",
            f"In Progress tasks: {analytics['in_progress_tasks']}",
            f"In Review tasks: {analytics['in_review_tasks']}",
            f"Blocked tasks: {analytics['blocked_tasks']}",
            f"On Hold tasks: {analytics['on_hold_tasks']}",
        ]

        recommendations = [
            "Balance workload across team members.",
            "Resolve blocked tasks quickly.",
            "Monitor tasks that remain in review for extended periods.",
        ]

        return InvestigationResult(
            investigation_type=context.investigation_type,
            summary="Task workload investigation completed.",
            findings=findings,
            recommendations=recommendations,
            confidence=0.93,
        )