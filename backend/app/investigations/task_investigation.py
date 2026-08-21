from sqlalchemy.orm import Session

from app.ai.sub_intent import AISubIntent
from app.analyzers.task_analyzer import TaskAnalyzer


class TaskInvestigation:

    @staticmethod
    def investigate(
        db: Session,
        company_id: int,
        message: str,
        sub_intent: AISubIntent,
    ):

        return TaskAnalyzer.analyze(
            db=db,
            company_id=company_id,
            message=message,
            sub_intent=sub_intent,
        )