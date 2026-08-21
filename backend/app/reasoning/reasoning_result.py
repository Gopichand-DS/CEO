from pydantic import BaseModel, ConfigDict


class ReasoningResult(BaseModel):
    model_config = ConfigDict(extra="forbid")

    summary: str
    observations: list[str]
    risks: list[str]
    opportunities: list[str]
    confidence: float