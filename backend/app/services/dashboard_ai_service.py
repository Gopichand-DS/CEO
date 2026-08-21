from app.schemas.dashboard import DashboardSummary
from app.ai.context.executive_context import ExecutiveContext
from app.memory.memory_manager import MemoryManager

class DashboardAIService:

    @staticmethod
    def generate_summary(
        dashboard: DashboardSummary,
    ) -> dict:

        insights = []

        if dashboard.health_score >= 80:
            insights.append("Overall business health is excellent.")
        elif dashboard.health_score >= 60:
            insights.append("Business health is stable but has room for improvement.")
        else:
            insights.append("Business health requires immediate attention.")

        if dashboard.tasks.overdue > 0:
            insights.append(
                f"{dashboard.tasks.overdue} overdue task(s) require immediate action."
            )

        if dashboard.projects.active == 0:
            insights.append("There are no active projects.")
        else:
            insights.append(
                f"{dashboard.projects.active} active project(s) are currently running."
            )

        recommendations = []

        if dashboard.tasks.overdue > 0:
            recommendations.append(
                "Review overdue tasks and assign additional resources if necessary."
            )

        if dashboard.project_completion_percentage < 50:
            recommendations.append(
                "Monitor project execution and identify delivery bottlenecks."
            )

        if not recommendations:
            recommendations.append(
                "Continue monitoring KPIs and maintain current performance."
            )

        return {
            "health_score": dashboard.health_score,
            "summary": insights,
            "recommendations": recommendations,
        }

    @staticmethod
    def build_document_context(
        db,
        company_id,
        user_id,
        question,
        documents,
    ):
        return ExecutiveContext(
            company_id=company_id,
            question=question,
            intent="DOCUMENT",
            memory=MemoryManager.build_context(
                db=db,
                company_id=company_id,
                user_id=user_id,
            ),
            documents=[
                point.payload["content"]
                for point in documents
            ],
        )