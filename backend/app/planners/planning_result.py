from pydantic import BaseModel, ConfigDict


class PlanningResult(BaseModel):
    model_config = ConfigDict(extra="forbid")

    objectives: list[str]
    priorities: list[str]
    action_plan: list[str]
    estimated_impact: str
    confidence: float