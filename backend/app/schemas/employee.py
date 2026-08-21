from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, EmailStr

class EmployeeCreate(BaseModel):
    employee_code: str
    full_name: str
    email: EmailStr
    phone: str | None = None
    designation: str
    company_id: int
    team_id: int | None = None
    department_id: int
    manager_id: int | None = None
    joining_date: date
    salary: Decimal
    status: str = "ACTIVE"

class EmployeeUpdate(BaseModel):
    full_name: str | None = None
    phone: str | None = None
    team_id: int | None = None
    designation: str | None = None
    department_id: int | None = None
    manager_id: int | None = None
    joining_date: date | None = None
    salary: Decimal | None = None
    status: str | None = None

class EmployeeResponse(BaseModel):
    id: int
    employee_code: str
    full_name: str
    email: EmailStr
    phone: str | None
    designation: str
    company_id: int
    team_id: int | None
    department_id: int
    manager_id: int | None
    joining_date: date
    salary: Decimal
    status: str
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


