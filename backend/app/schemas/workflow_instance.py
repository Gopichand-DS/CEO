from pydantic import BaseModel, ConfigDict


class WorkflowInstanceBase(BaseModel):
    workflow_id: int
    employee_id: int
    current_step: int = 1
    status: str = "Pending"


class WorkflowInstanceCreate(WorkflowInstanceBase):
    pass


class WorkflowInstanceUpdate(BaseModel):
    workflow_id: int | None = None
    employee_id: int | None = None
    current_step: int | None = None
    status: str | None = None


class WorkflowInstanceResponse(WorkflowInstanceBase):
    id: int

    model_config = ConfigDict(from_attributes=True)