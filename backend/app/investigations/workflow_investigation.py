from sqlalchemy.orm import Session

from app.analyzers.workflow_analyzer import WorkflowAnalyzer
from app.investigations.investigation_result import InvestigationResult
from app.schemas.ai import WorkflowSubIntent


class WorkflowInvestigation:

    @staticmethod
    def investigate(
        db: Session,
        company_id: int,
        message: str,
        sub_intent: WorkflowSubIntent,
    ) -> InvestigationResult:

        return WorkflowAnalyzer.analyze(
            db=db,
            company_id=company_id,
            message=message,
            sub_intent=sub_intent,
        )