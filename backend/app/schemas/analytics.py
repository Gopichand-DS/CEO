from pydantic import BaseModel, ConfigDict


# -----------------------------
# Project Analytics
# -----------------------------
class ProjectAnalytics(BaseModel):
    total_projects: int
    active_projects: int
    completed_projects: int
    planned_projects: int
    delayed_projects: int
    completion_rate: float
    average_progress: float
    overdue_percentage: float
    high_risk_projects: int

    model_config = ConfigDict(from_attributes=True)


# -----------------------------
# Task Analytics
# -----------------------------
class TaskAnalytics(BaseModel):
    total_tasks: int

    pending_tasks: int
    in_progress_tasks: int
    in_review_tasks: int
    completed_tasks: int
    blocked_tasks: int
    on_hold_tasks: int
    cancelled_tasks: int
    overdue_tasks: int

    completion_percentage: float
    overdue_percentage: float

    critical_priority_tasks: int
    high_priority_tasks: int
    medium_priority_tasks: int
    low_priority_tasks: int

    model_config = ConfigDict(from_attributes=True)


class EmployeeAnalytics(BaseModel):
    total_employees: int
    active_employees: int
    inactive_employees: int
    new_employees: int
    employee_utilization: float
    average_salary: float

    model_config = ConfigDict(from_attributes=True)


# -----------------------------
# Workflow Analytics
# -----------------------------
class WorkflowAnalytics(BaseModel):
    total_workflows: int
    total_instances: int
    pending_instances: int
    running_instances: int
    completed_instances: int
    failed_instances: int
    completion_rate: float
    failure_rate: float
    pending_rate: float
    workflow_health_score: float
    model_config = ConfigDict(from_attributes=True)

# -----------------------------
# AI Analytics
# -----------------------------
class AIAnalytics(BaseModel):
    total_requests: int
    successful_requests: int
    failed_requests: int

    model_config = ConfigDict(from_attributes=True)


# -----------------------------
# Dashboard Summary
# -----------------------------
class DashboardAnalytics(BaseModel):
    projects: ProjectAnalytics
    tasks: TaskAnalytics
    employees: EmployeeAnalytics
    workflows: WorkflowAnalytics
    ai: AIAnalytics

    model_config = ConfigDict(from_attributes=True)