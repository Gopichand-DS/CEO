from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class ProjectBase(BaseModel):
    name: str = Field(
        ...,
        min_length=2,
        max_length=150,
    )

    description: str | None = Field(
        default=None,
        max_length=500,
    )

    company_id: int

    department_id: int

    start_date: date

    end_date: date | None = None

    status: str = "PLANNED"

    budget: Decimal


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    name: str | None = None

    description: str | None = None

    company_id: int | None = None

    department_id: int | None = None

    start_date: date | None = None

    end_date: date | None = None

    status: str | None = None

    budget: Decimal | None = None


class ProjectResponse(ProjectBase):
    id: int

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )