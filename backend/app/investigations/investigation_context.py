from dataclasses import dataclass

from app.schemas.analytics import (
    ProjectAnalytics,
    TaskAnalytics,
    EmployeeAnalytics,
    WorkflowAnalytics,
    AIAnalytics,
)

from app.schemas.executive_analytics import (
    ExecutiveAnalytics,
)


@dataclass
class InvestigationContext:

    question: str
    intent: str

    executive_analytics: ExecutiveAnalytics

    project_analytics: ProjectAnalytics

    task_analytics: TaskAnalytics

    employee_analytics: EmployeeAnalytics

    workflow_analytics: WorkflowAnalytics

    ai_analytics: AIAnalytics

    conversation_history: list