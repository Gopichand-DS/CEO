from pydantic import BaseModel, Field


class ExecutiveDecision(BaseModel):
    priority: str
    title: str
    description: str
    findings: list[str] = Field(default_factory=list)
    recommendations: list[str] = Field(default_factory=list)
    confidence: float | None = None

class ExecutiveDecisionResponse(BaseModel):
    overall_status: str
    executive_summary: str
    decisions: list[ExecutiveDecision]