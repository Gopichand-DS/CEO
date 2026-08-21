from pydantic import BaseModel, Field
from datetime import date


class KPIResponse(BaseModel):
    revenue: float
    profit: float
    employees: int
    projects: int


class RevenueChartItem(BaseModel):
    month: str
    revenue: float
    profit: float


class ActivityResponse(BaseModel):
    title: str
    description: str
    created_at: str


class AlertResponse(BaseModel):
    title: str
    severity: str
    description: str

class EmployeeSummary(BaseModel):
    total: int
    active: int


class ProjectSummary(BaseModel):
    total: int
    active: int
    completed: int
    planned: int


class TaskSummary(BaseModel):
    total: int
    completed: int
    pending: int
    overdue: int

class ExecutiveMetric(BaseModel):
    title: str
    value: str
    trend: str
    status: str


class CompanyHealth(BaseModel):
    overall_score: float
    financial_health: float
    employee_health: float
    operational_health: float
    customer_health: float


class PendingApproval(BaseModel):
    id: int
    title: str
    requested_by: str
    category: str
    priority: str
    requested_at: str


class DepartmentPerformance(BaseModel):
    id: int
    department: str
    performance: float
    employees: int
    status: str


class ProjectStatus(BaseModel):
    id: int
    project: str
    manager: str
    progress: float
    status: str
    due_date: date


class EmployeeDepartment(BaseModel):
    department: str
    employees: int


class EmployeeOverview(BaseModel):
    total_employees: int
    active_employees: int
    on_leave: int
    new_joinees: int
    departments: list[EmployeeDepartment]


class DashboardOverviewResponse(BaseModel):
    kpis: KPIResponse
    revenue_chart: list[RevenueChartItem]
    activities: list = Field(default_factory=list)
    alerts: list[AlertResponse]
    executive_metrics: list[ExecutiveMetric]
    company_health: CompanyHealth
    approvals: list[PendingApproval]
    ai_summary: str
    department_performance: list[DepartmentPerformance]
    project_status: list[ProjectStatus]
    employee_overview: EmployeeOverview
    
class DashboardSummary(BaseModel):
    employees: EmployeeSummary
    projects: ProjectSummary
    tasks: TaskSummary
    task_completion_percentage: float
    project_completion_percentage: float
    health_score: float
