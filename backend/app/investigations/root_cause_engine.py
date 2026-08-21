from app.investigations.investigation_context import (
    InvestigationContext,
)


class RootCauseEngine:

    @staticmethod
    def analyze(
        context: InvestigationContext,
    ):

        project_analytics = context.project_analytics
        task_analytics = context.task_analytics

        causes = []

        if project_analytics.delayed_projects > 0:

            causes.append(
                "Project schedule slippage detected."
            )

        if task_analytics.pending_tasks > 0:

            causes.append(
                "Pending tasks are blocking progress."
            )

        if task_analytics.overdue_tasks > 0:

            causes.append(
                "Overdue tasks require immediate attention."
            )

        if not causes:

            causes.append(
                "No major operational bottlenecks detected."
            )

        return causes