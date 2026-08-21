from enum import Enum


class InvestigationIntent(str, Enum):
    PROJECT = "PROJECT"
    TASK = "TASK"
    EMPLOYEE = "EMPLOYEE"
    WORKFLOW = "WORKFLOW"
    FINANCE = "FINANCE"
    DASHBOARD = "DASHBOARD"
    UNKNOWN = "UNKNOWN"


class IntentClassifier:

    @staticmethod
    def classify(question: str) -> InvestigationIntent:

        question = question.lower()

        if any(word in question for word in [
            "project",
            "projects",
            "deadline",
            "milestone",
            "delivery",
        ]):
            return InvestigationIntent.PROJECT

        if any(word in question for word in [
            "task",
            "tasks",
            "todo",
            "overdue",
        ]):
            return InvestigationIntent.TASK

        if any(word in question for word in [
            "employee",
            "employees",
            "staff",
            "team",
            "manager",
        ]):
            return InvestigationIntent.EMPLOYEE

        if any(word in question for word in [
            "workflow",
            "automation",
            "process",
        ]):
            return InvestigationIntent.WORKFLOW

        if any(word in question for word in [
            "dashboard",
            "overview",
            "kpi",
            "metrics",
        ]):
            return InvestigationIntent.DASHBOARD

        if any(word in question for word in [
            "revenue",
            "profit",
            "loss",
            "finance",
            "sales",
            "income",
        ]):
            return InvestigationIntent.FINANCE

        return InvestigationIntent.UNKNOWN