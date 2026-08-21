from enum import Enum


class AIIntent(str, Enum):
    CHAT = "chat"

    GENERAL_CHAT = "general_chat"

    DASHBOARD_SUMMARY = "dashboard_summary"

    DASHBOARD_ANALYSIS = "DASHBOARD_ANALYSIS"
    
    SALES_ANALYSIS = "sales_analysis"

    PROJECT_ANALYSIS = "project_analysis"

    EMPLOYEE_ANALYSIS = "employee_analysis"

    TASK_ANALYSIS = "task_analysis"
    
    COMPANY_ANALYSIS = "company_analysis"

    WORKFLOW_ANALYSIS = "workflow_analysis"

    KPI_SUMMARY = "kpi_summary"

    DATABASE_QUERY = "database_query"

    DECISION = "DECISION"

    INVESTIGATION = "investigation"
    
    UNKNOWN = "unknown"

    