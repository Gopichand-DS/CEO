from pydantic import BaseModel

from app.ai.planner.plan_step import (
    PlanStep,
)


class ExecutionPlan(BaseModel):

    steps: list[PlanStep]

    final_goal: str