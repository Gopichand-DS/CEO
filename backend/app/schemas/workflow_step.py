from pydantic import BaseModel, ConfigDict


class WorkflowStepBase(BaseModel):
    workflow_id: int
    step_order: int
    step_name: str
    description: str | None = None
    is_required: bool = True


class WorkflowStepCreate(WorkflowStepBase):
    pass


class WorkflowStepUpdate(BaseModel):
    workflow_id: int | None = None
    step_order: int | None = None
    step_name: str | None = None
    description: str | None = None
    is_required: bool | None = None


class WorkflowStepResponse(WorkflowStepBase):
    id: int

    model_config = ConfigDict(from_attributes=True)