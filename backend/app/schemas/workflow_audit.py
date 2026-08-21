from datetime import datetime

from pydantic import BaseModel, ConfigDict


class WorkflowAuditResponse(BaseModel):
    id: int
    workflow_instance_id: int
    action: str
    remarks: str | None = None
    performed_by: str
    performed_at: datetime

    model_config = ConfigDict(from_attributes=True)

