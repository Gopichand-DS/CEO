from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.finance_repository import (
    FinanceRepository,
)

from app.schemas.finance import (
    FinanceCreate,
    FinanceUpdate,
)


class FinanceService:

    @staticmethod
    def create(
        db: Session,
        finance: FinanceCreate,
        company_id: int,
    ):
        return FinanceRepository.create(
            db=db,
            finance=finance,
            company_id=company_id,
        )

    @staticmethod
    def get_all(
        db: Session,
        company_id: int,
    ):
        return FinanceRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

    @staticmethod
    def get_by_id(
        db: Session,
        finance_id: int,
        company_id: int,
    ):
        finance = FinanceRepository.get_by_id(
            db=db,
            finance_id=finance_id,
            company_id=company_id,
        )

        if finance is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Finance record not found.",
            )

        return finance

    @staticmethod
    def update(
        db: Session,
        finance_id: int,
        finance: FinanceUpdate,
        company_id: int,
    ):
        updated = FinanceRepository.update(
            db=db,
            finance_id=finance_id,
            company_id=company_id,
            finance=finance,
        )

        if updated is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Finance record not found.",
            )

        return updated

    @staticmethod
    def delete(
        db: Session,
        finance_id: int,
        company_id: int,
    ):
        deleted = FinanceRepository.delete(
            db=db,
            finance_id=finance_id,
            company_id=company_id,
        )

        if deleted is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Finance record not found.",
            )

        return deleted