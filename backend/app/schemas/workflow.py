from pydantic import BaseModel, ConfigDict


class WorkflowBase(BaseModel):
    workflow_code: str
    workflow_name: str
    description: str | None = None
    company_id: int
    is_active: bool = True


class WorkflowCreate(WorkflowBase):
    pass


class WorkflowUpdate(BaseModel):
    workflow_code: str | None = None
    workflow_name: str | None = None
    description: str | None = None
    company_id: int | None = None
    is_active: bool | None = None


class WorkflowResponse(WorkflowBase):
    id: int

    model_config = ConfigDict(from_attributes=True)