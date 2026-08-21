from enum import Enum


class AISubIntent(str, Enum):

    # Generic
    GENERAL = "GENERAL"

    # Project
    PROJECT_LIST = "PROJECT_LIST"
    PROJECT_STATUS = "PROJECT_STATUS"
    PROJECT_DELAY = "PROJECT_DELAY"
    PROJECT_PROGRESS = "PROJECT_PROGRESS"
    PROJECT_BUDGET = "PROJECT_BUDGET"
    PROJECT_RISK = "PROJECT_RISK"

    # Task
    TASK_LIST = "task_list"
    TASK_PROGRESS = "task_progress"
    TASK_PENDING = "task_pending"
    TASK_OVERDUE = "task_overdue"
    TASK_WORKLOAD = "task_workload"

    # Employee
    EMPLOYEE_LIST = "employee_list"
    EMPLOYEE_PERFORMANCE = "employee_performance"
    EMPLOYEE_WORKLOAD = "employee_workload"
    EMPLOYEE_ATTENDANCE = "employee_attendance"
    EMPLOYEE_PRODUCTIVITY = "employee_productivity"

    # Workflow
    WORKFLOW_STATUS = "WORKFLOW_STATUS"
    WORKFLOW_FAILURE = "WORKFLOW_FAILURE"

    # KPI
    KPI_SUMMARY = "KPI_SUMMARY"