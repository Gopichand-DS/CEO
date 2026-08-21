from app.investigations.intent_classifier import (
    InvestigationIntent,
)

from app.ai.planner.execution_plan import (
    ExecutionPlan,
)

from app.ai.planner.plan_step import (
    PlanStep,
)


class Planner:

    @staticmethod
    def build(
        intent: InvestigationIntent,
        question:str,
    ) -> ExecutionPlan:

        if intent == InvestigationIntent.FINANCE:

            return ExecutionPlan(
                final_goal="Financial Analysis",
                steps=[
                    PlanStep(
                        order=1,
                        tool="finance_tool",
                        reason="Collect financial KPIs",
                    )
                ],
            )

        if intent == InvestigationIntent.DASHBOARD:

            return ExecutionPlan(
                final_goal="Dashboard",
                steps=[
                    PlanStep(
                        order=1,
                        tool="dashboard_tool",
                        reason="Collect dashboard metrics",
                    )
                ],
            )

        if intent == InvestigationIntent.WORKFLOW:

            return ExecutionPlan(
                final_goal="Workflow Analysis",
                steps=[
                    PlanStep(
                        order=1,
                        tool="workflow_tool",
                        reason="Collect workflow information",
                    )
                ],
            )

        if intent in [
            InvestigationIntent.PROJECT,
            InvestigationIntent.TASK,
            InvestigationIntent.EMPLOYEE,
        ]:

            return ExecutionPlan(
                final_goal="Investigation",
                steps=[
                    PlanStep(
                        order=1,
                        tool="investigation_tool",
                        reason="Retrieve detailed investigation results",
                        parameters={
                            "question": question,
                        },
                    ),
                ],
            )

        return ExecutionPlan(
            final_goal="General",
            steps=[],
        )