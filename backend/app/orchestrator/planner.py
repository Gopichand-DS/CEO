from dataclasses import dataclass, field


@dataclass
class ExecutionStep:
    name: str
    tool: str
    description: str


@dataclass
class ExecutionPlan:
    intent: str
    steps: list[ExecutionStep] = field(
        default_factory=list,
    )

    def add_step(
        self,
        name: str,
        tool: str,
        description: str,
    ):

        self.steps.append(
            ExecutionStep(
                name=name,
                tool=tool,
                description=description,
            )
        )
from app.services.intent_service import AIIntent

from app.orchestrator.execution_plan import (
    ExecutionPlan,
)


class Planner:

    @staticmethod
    def build(
        intent: AIIntent,
        message: str,
    ):

        plan = ExecutionPlan(
            intent=intent.value,
        )

        if intent == AIIntent.DASHBOARD:

            plan.add_step(
                "Dashboard Summary",
                "dashboard_tool",
                "Collect dashboard KPIs",
            )

        elif intent == AIIntent.EMPLOYEE:

            plan.add_step(
                "Employee Analytics",
                "employee_tool",
                "Collect employee information",
            )

        elif intent == AIIntent.PROJECT:

            plan.add_step(
                "Project Analytics",
                "project_tool",
                "Collect project information",
            )

        else:

            plan.add_step(
                "General",
                "general_tool",
                "General response",
            )

        return plan