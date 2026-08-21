from enum import Enum


class EventType(str, Enum):
    WORKFLOW_STARTED = "workflow.started"
    WORKFLOW_ADVANCED = "workflow.advanced"
    WORKFLOW_PAUSED = "workflow.paused"
    WORKFLOW_RESUMED = "workflow.resumed"
    WORKFLOW_CANCELLED = "workflow.cancelled"
    WORKFLOW_COMPLETED = "workflow.completed"

    TASK_CREATED = "task.created"
    TASK_COMPLETED = "task.completed"

    PROJECT_CREATED = "project.created"
    PROJECT_COMPLETED = "project.completed"

    EMPLOYEE_CREATED = "employee.created"