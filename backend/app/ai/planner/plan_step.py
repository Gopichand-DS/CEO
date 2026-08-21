from pydantic import BaseModel


class PlanStep(BaseModel):

    order: int

    tool: str

    reason: str

    parameters: dict = {}