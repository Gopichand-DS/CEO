from pydantic import BaseModel, ConfigDict


class PlanningContext(BaseModel):
    model_config = ConfigDict(extra="forbid")

    company_id: int
    message: str
    investigation_result: dict