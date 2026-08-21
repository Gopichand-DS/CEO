from pydantic import BaseModel, ConfigDict


class InvestigationMemory(BaseModel):
    model_config = ConfigDict(extra="forbid")

    investigation_type: str
    summary: str
    confidence: float