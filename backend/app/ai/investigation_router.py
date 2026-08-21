from sqlalchemy.orm import Session

from app.ai.sub_intent import AISubIntent
from app.ai.intent import AIIntent
from app.ai.intent_detector import IntentDetector

from app.investigations.task_investigation import TaskInvestigation
from app.investigations.dashboard_investigation import DashboardInvestigation
from app.investigations.project_investigation import ProjectInvestigation
from app.investigations.employee_investigation import EmployeeInvestigation
from app.investigations.workflow_investigation import WorkflowInvestigation


class InvestigationRouter:

    @staticmethod
    def _detect_sub_intent(
        message: str,
        intent: AIIntent,
    ) -> AISubIntent:

        text = message.lower()

        # -------------------------
        # Project
        # -------------------------

        if intent == AIIntent.PROJECT_ANALYSIS:

            if any(word in text for word in [
                "delay",
                "delayed",
                "late",
                "deadline",
            ]):
                return AISubIntent.PROJECT_DELAY

            if any(word in text for word in [
                "risk",
                "risky",
            ]):
                return AISubIntent.PROJECT_RISK

            if any(word in text for word in [
                "budget",
                "cost",
                "spending",
            ]):
                return AISubIntent.PROJECT_BUDGET

            if any(word in text for word in [
                "progress",
                "completion",
                "completed",
            ]):
                return AISubIntent.PROJECT_PROGRESS

            if any(word in text for word in [
                "status",
                "state",
            ]):
                return AISubIntent.PROJECT_STATUS

            if any(word in text for word in [
                "list",
                "all projects",
                "projects",
            ]):
                return AISubIntent.PROJECT_LIST

            return AISubIntent.PROJECT_STATUS

        # -------------------------
        # Task
        # -------------------------

        if intent == AIIntent.TASK_ANALYSIS:

            if any(word in text for word in [
                "overdue",
                "late",
                "delayed",
            ]):
                return AISubIntent.TASK_OVERDUE

            if any(word in text for word in [
                "pending",
                "todo",
            ]):
                return AISubIntent.TASK_PENDING

            if any(word in text for word in [
                "progress",
                "completion",
                "completed",
            ]):
                return AISubIntent.TASK_PROGRESS

            if any(word in text for word in [
                "workload",
                "assigned",
            ]):
                return AISubIntent.TASK_WORKLOAD

            if any(word in text for word in [
                "list",
                "all tasks",
                "tasks",
            ]):
                return AISubIntent.TASK_LIST

            return AISubIntent.TASK_LIST

        # -------------------------
        # Employee
        # -------------------------

        if intent == AIIntent.EMPLOYEE_ANALYSIS:

            if any(word in text for word in [
                "performance",
                "performing",
            ]):
                return AISubIntent.EMPLOYEE_PERFORMANCE

            if any(word in text for word in [
                "workload",
                "assigned",
            ]):
                return AISubIntent.EMPLOYEE_WORKLOAD

            if any(word in text for word in [
                "attendance",
                "absent",
            ]):
                return AISubIntent.EMPLOYEE_ATTENDANCE

            if any(word in text for word in [
                "productivity",
                "productive",
            ]):
                return AISubIntent.EMPLOYEE_PRODUCTIVITY

            if any(word in text for word in [
                "list",
                "all employees",
                "employees",
                "staff",
            ]):
                return AISubIntent.EMPLOYEE_LIST

            return AISubIntent.EMPLOYEE_LIST

        # -------------------------
        # Workflow
        # -------------------------

        if intent == AIIntent.WORKFLOW_ANALYSIS:

            if any(word in text for word in [
                "failure",
                "failed",
                "error",
                "errors",
            ]):
                return AISubIntent.WORKFLOW_FAILURE

            return AISubIntent.WORKFLOW_STATUS

        return AISubIntent.GENERAL

    @staticmethod
    def investigate(
        db: Session,
        company_id: int,
        message: str,
    ):

        intent = IntentDetector.detect(message)

        sub_intent = InvestigationRouter._detect_sub_intent(
            message=message,
            intent=intent,
        )

        # -------------------------
        # Dashboard
        # -------------------------

        if intent == AIIntent.DASHBOARD_SUMMARY:

            return (
                intent,
                DashboardInvestigation.investigate(
                    db=db,
                    company_id=company_id,
                ),
            )

        # -------------------------
        # Project
        # -------------------------

        if intent == AIIntent.PROJECT_ANALYSIS:

            return (
                intent,
                ProjectInvestigation.investigate(
                    db=db,
                    company_id=company_id,
                    message=message,
                    sub_intent=sub_intent,
                ),
            )

        # -------------------------
        # Employee
        # -------------------------

        if intent == AIIntent.EMPLOYEE_ANALYSIS:

            return (
                intent,
                EmployeeInvestigation.investigate(
                    db=db,
                    company_id=company_id,
                    message=message,
                    sub_intent=sub_intent,
                ),
            )

        # -------------------------
        # Task
        # -------------------------

        if intent == AIIntent.TASK_ANALYSIS:

            return (
                intent,
                TaskInvestigation.investigate(
                    db=db,
                    company_id=company_id,
                    message=message,
                    sub_intent=sub_intent,
                ),
            )

        # -------------------------
        # Workflow
        # -------------------------

        if intent == AIIntent.WORKFLOW_ANALYSIS:

            return (
                intent,
                WorkflowInvestigation.investigate(
                    db=db,
                    company_id=company_id,
                    message=message,
                    sub_intent=sub_intent,
                ),
            )

        # -------------------------
        # General Chat
        # -------------------------

        if intent in [
            AIIntent.GENERAL_CHAT,
            AIIntent.CHAT,
        ]:

            return (
                intent,
                {},
            )

        # -------------------------
        # Fallback
        # -------------------------

        return (
            AIIntent.DASHBOARD_SUMMARY,
            DashboardInvestigation.investigate(
                db=db,
                company_id=company_id,
            ),
        )