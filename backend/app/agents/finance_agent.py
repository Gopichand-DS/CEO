from sqlalchemy.orm import Session

from app.repositories.finance_repository import (
    FinanceRepository,
)


class FinanceAgent:

    @staticmethod
    def process(
        db: Session,
        company_id: int,
    ):

        return FinanceRepository.get_financial_summary(
            db=db,
            company_id=company_id,
        )