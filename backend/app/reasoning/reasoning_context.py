from pydantic import BaseModel, ConfigDict


class ReasoningContext(BaseModel):
    model_config = ConfigDict(extra="forbid")

    company_id: int
    message: str
    investigation_result: dict