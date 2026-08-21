from pydantic import BaseModel
from datetime import datetime


class ApprovalCreate(BaseModel):
    title: str
    approval_type: str
    requested_by: int


class ApprovalUpdate(BaseModel):
    approved_by: int
    status: str


class ApprovalResponse(BaseModel):
    id: int
    title: str
    approval_type: str
    requested_by: int
    approved_by: int | None
    status: str
    created_at: datetime
    approved_at: datetime | None

    model_config = {
        "from_attributes": True,
    }