from sqlalchemy.orm import Session

from app.analyzers.project_analyzer import ProjectAnalyzer
from app.ai.sub_intent import AISubIntent


class ProjectInvestigation:

    @staticmethod
    def investigate(
        db: Session,
        company_id: int,
        message: str,
        sub_intent: AISubIntent,
    ):

        return ProjectAnalyzer.analyze(
            db=db,
            company_id=company_id,
            message=message,
            sub_intent=sub_intent,
        )