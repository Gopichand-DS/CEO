from pydantic import BaseModel
from enum import Enum

class AIChatRequest(BaseModel):
    message: str
    


class AIChatResponse(BaseModel):
    response: str

class DashboardSubIntent(str, Enum):
    SUMMARY = "SUMMARY"
    REVENUE = "REVENUE"
    SALES = "SALES"
    EMPLOYEES = "EMPLOYEES"
    PROJECTS = "PROJECTS"

class ProjectSubIntent(str, Enum):
    LIST = "LIST"
    STATUS = "STATUS"
    DELAY = "DELAY"
    BUDGET = "BUDGET"
    DEADLINE = "DEADLINE"

class EmployeeSubIntent(str, Enum):
    LIST = "LIST"
    PERFORMANCE = "PERFORMANCE"
    WORKLOAD = "WORKLOAD"
    ATTENDANCE = "ATTENDANCE"

class TaskSubIntent(str, Enum):
    LIST = "LIST"
    PROGRESS = "PROGRESS"
    PENDING = "PENDING"
    OVERDUE = "OVERDUE"
    WORKLOAD = "WORKLOAD"

class WorkflowSubIntent(str, Enum):
    LIST = "LIST"
    STATUS = "STATUS"