from sqlalchemy.orm import Session

from app.analyzers.employee_analyzer import EmployeeAnalyzer
from app.ai.sub_intent import AISubIntent


class EmployeeInvestigation:

    @staticmethod
    def investigate(
        db: Session,
        company_id: int,
        message: str,
        sub_intent: AISubIntent,
    ):

        return EmployeeAnalyzer.analyze(
            db=db,
            company_id=company_id,
            message=message,
            sub_intent=sub_intent,
        )