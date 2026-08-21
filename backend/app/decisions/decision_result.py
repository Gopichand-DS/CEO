from pydantic import BaseModel, ConfigDict


class DecisionResult(BaseModel):
    model_config = ConfigDict(extra="forbid")

    summary: str
    actions: list[str]
    priority: str
    confidence: float   