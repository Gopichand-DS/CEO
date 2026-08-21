from app.planners.planning_context import PlanningContext
from app.planners.planning_result import PlanningResult


class ExecutivePlanner:

    @staticmethod
    def generate_plan(
        context: PlanningContext,
    ) -> PlanningResult:

        return PlanningResult(
            objectives=[],
            priorities=[],
            action_plan=[],
            estimated_impact="Medium",
            confidence=0.90,
        )