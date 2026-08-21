from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.finance import Finance
from app.schemas.finance import (
    FinanceCreate,
    FinanceUpdate,
)


class FinanceRepository:

    @staticmethod
    def create(
        db: Session,
        finance: FinanceCreate,
        company_id: int,
    ):
        db_finance = Finance(
            **finance.model_dump(
                exclude={"company_id"},
            ),
            company_id=company_id,
        )

        db.add(db_finance)
        db.commit()
        db.refresh(db_finance)

        return db_finance

    @staticmethod
    def get_all_by_company(
        db: Session,
        company_id: int,
    ):
        return (
            db.query(Finance)
            .filter(
                Finance.company_id == company_id
            )
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        finance_id: int,
        company_id: int,
    ):
        return (
            db.query(Finance)
            .filter(
                Finance.id == finance_id,
                Finance.company_id == company_id,
            )
            .first()
        )

    @staticmethod
    def update(
        db: Session,
        finance_id: int,
        company_id: int,
        finance: FinanceUpdate,
    ):
        db_finance = (
            db.query(Finance)
            .filter(
                Finance.id == finance_id,
                Finance.company_id == company_id,
            )
            .first()
        )

        if not db_finance:
            return None

        update_data = finance.model_dump(
            exclude_unset=True,
            exclude={"company_id"},
        )

        for key, value in update_data.items():
            setattr(
                db_finance,
                key,
                value,
            )

        db.commit()
        db.refresh(db_finance)

        return db_finance

    @staticmethod
    def delete(
        db: Session,
        finance_id: int,
        company_id: int,
    ):
        db_finance = (
            db.query(Finance)
            .filter(
                Finance.id == finance_id,
                Finance.company_id == company_id,
            )
            .first()
        )

        if not db_finance:
            return None

        db.delete(db_finance)
        db.commit()

        return db_finance

    @staticmethod
    def get_financial_summary(
        db: Session,
        company_id: int,
    ):
        revenue = (
            db.query(
                func.coalesce(
                    func.sum(Finance.amount),
                    0,
                )
            )
            .filter(
                Finance.company_id == company_id,
                Finance.transaction_type == "REVENUE",
            )
            .scalar()
        )

        expenses = (
            db.query(
                func.coalesce(
                    func.sum(Finance.amount),
                    0,
                )
            )
            .filter(
                Finance.company_id == company_id,
                Finance.transaction_type == "EXPENSE",
            )
            .scalar()
        )

        profit = revenue - expenses

        return {
            "revenue": float(revenue),
            "expenses": float(expenses),
            "profit": float(profit),
        }