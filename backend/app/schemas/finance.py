from datetime import date

from decimal import Decimal

from pydantic import BaseModel


class FinanceCreate(BaseModel):
    transaction_type: str
    category: str
    description: str | None = None
    amount: Decimal
    transaction_date: date
    company_id: int
    status: str = "COMPLETED"


class FinanceUpdate(BaseModel):
    transaction_type: str | None = None
    category: str | None = None
    description: str | None = None
    amount: Decimal | None = None
    transaction_date: date | None = None
    status: str | None = None


class FinanceResponse(BaseModel):
    id: int
    transaction_type: str
    category: str
    description: str | None
    amount: Decimal
    transaction_date: date
    status: str
    company_id: int

    model_config = {
        "from_attributes": True,
    }