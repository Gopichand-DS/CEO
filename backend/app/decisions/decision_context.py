from pydantic import BaseModel, ConfigDict


class DecisionContext(BaseModel):
    model_config = ConfigDict(extra="forbid")

    company_id: int
    message: str
    investigation_result: dict