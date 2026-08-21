from sqlalchemy.orm import Session

from app.services.investigation_service import InvestigationService


class ExecutiveAgent:

    @staticmethod
    def process(
        db: Session,
        company_id: int,
        question: str,
    ):

        investigation = InvestigationService.investigate(
            db=db,
            company_id=company_id,
            question=question,
        )

        return investigation