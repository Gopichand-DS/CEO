from app.schemas.decision import (
    ExecutiveDecision,
)


class DecisionRuleEngine:

    @staticmethod
    def evaluate(context:dict,):
        dashboard = context["dashboard"]

        decisions = []

        if dashboard.tasks.overdue > 0:
            decisions.append(
                ExecutiveDecision(
                    priority="HIGH",
                    title="Overdue Tasks",
                    description=(
                        f"{dashboard.tasks.overdue} overdue "
                        "task(s) require immediate attention."
                    ),
                )
            )

        if dashboard.project_completion_percentage < 50:
            decisions.append(
                ExecutiveDecision(
                    priority="HIGH",
                    title="Project Progress",
                    description=(
                        "Project completion rate is below 50%."
                    ),
                )
            )

        if dashboard.task_completion_percentage < 70:
            decisions.append(
                ExecutiveDecision(
                    priority="MEDIUM",
                    title="Task Completion",
                    description=(
                        "Task completion rate is below target."
                    ),
                )
            )

        if dashboard.projects.active == 0:
            decisions.append(
                ExecutiveDecision(
                    priority="LOW",
                    title="No Active Projects",
                    description=(
                        "No active projects are currently running."
                    ),
                )
            )

        if not decisions:
            decisions.append(
                ExecutiveDecision(
                    priority="LOW",
                    title="Business Status",
                    description="Business operations are healthy.",
                )
            )

        return decisions