from app.decisions.decision_context import DecisionContext
from app.decisions.decision_result import DecisionResult


class ExecutiveDecisionService:

    @staticmethod
    def generate_decisions(
        context: DecisionContext,
    ) -> DecisionResult:

        investigation = context.investigation_result

        actions = []
        priority = "LOW"

        # Project decisions
        if "overdue_projects" in investigation:
            overdue = investigation["overdue_projects"]

            if overdue > 0:
                priority = "HIGH"
                actions.append(
                    "Review overdue projects with project managers."
                )

        # Employee decisions
        if "inactive_employees" in investigation:
            inactive = investigation["inactive_employees"]

            if inactive > 0:
                actions.append(
                    "Review inactive employee assignments."
                )

        # Task decisions
        if "overdue_tasks" in investigation:
            overdue_tasks = investigation["overdue_tasks"]

            if overdue_tasks > 0:
                priority = "HIGH"
                actions.append(
                    "Resolve overdue tasks immediately."
                )

        if "blocked_tasks" in investigation:
            blocked = investigation["blocked_tasks"]

            if blocked > 0:
                actions.append(
                    "Remove blockers affecting task completion."
                )

        if not actions:
            actions.append(
                "No immediate executive action is required."
            )

        return DecisionResult(
            summary="Executive decision analysis completed.",
            actions=actions,
            priority=priority,
            confidence=0.92,
        )