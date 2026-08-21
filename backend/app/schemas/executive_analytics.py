from pydantic import BaseModel, ConfigDict

from app.schemas.analytics import (
    ProjectAnalytics,
    TaskAnalytics,
    EmployeeAnalytics,
    WorkflowAnalytics,
)


class ExecutiveKPIs(BaseModel):
    revenue: float
    profit: float
    active_projects: int
    active_employees: int
    completed_tasks: int
    company_health: float

    model_config = ConfigDict(from_attributes=True)


class ExecutiveAnalytics(BaseModel):
    kpis: ExecutiveKPIs

    projects: ProjectAnalytics

    tasks: TaskAnalytics

    employees: EmployeeAnalytics

    workflows: WorkflowAnalytics

    ai_summary: str

    model_config = ConfigDict(from_attributes=True)