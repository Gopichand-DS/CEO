from app.ai.intent import AIIntent


class IntentDetector:

    @staticmethod
    def detect(message: str) -> AIIntent:

        text = message.lower()

        # -------------------------
        # Dashboard
        # -------------------------

        if any(word in text for word in [
            "dashboard",
            "summary",
            "overview",
            "report",
        ]):
            return AIIntent.DASHBOARD_SUMMARY

        # -------------------------
        # Project
        # -------------------------

        if any(word in text for word in [
            "project",
            "deadline",
            "milestone",
        ]):
            return AIIntent.PROJECT_ANALYSIS

        # -------------------------
        # Employee
        # -------------------------

        if any(word in text for word in [
            "employee",
            "team",
            "staff",
        ]):
            return AIIntent.EMPLOYEE_ANALYSIS

        # -------------------------
        # Task
        # -------------------------

        if any(word in text for word in [
            "task",
            "tasks",
            "todo",
            "pending",
            "overdue",
        ]):
            return AIIntent.TASK_ANALYSIS

        # -------------------------
        # Workflow
        # -------------------------

        if any(word in text for word in [
            "workflow",
            "workflows",
        ]):
            return AIIntent.WORKFLOW_ANALYSIS

        # -------------------------
        # Company
        # -------------------------

        if any(word in text for word in [
            "company",
            "business",
        ]):
            return AIIntent.COMPANY_ANALYSIS

        # -------------------------
        # General Chat
        # -------------------------

        return AIIntent.GENERAL_CHAT