from app.ai.intent import AIIntent
from app.ai.intent_result import IntentResult
from app.ai.sub_intent import AISubIntent


class IntentClassifier:

    @staticmethod
    def classify(message: str) -> IntentResult:

        text = message.lower()

        # -------------------------
        # Project
        # -------------------------

        if (
            "project" in text
            and any(word in text for word in [
                "delay",
                "delayed",
                "late",
                "deadline",
            ])
        ):
            return IntentResult(
                intent=AIIntent.PROJECT_ANALYSIS,
                sub_intent=AISubIntent.PROJECT_DELAY,
            )

        if "progress" in text and "project" in text:
            return IntentResult(
                intent=AIIntent.PROJECT_ANALYSIS,
                sub_intent=AISubIntent.PROJECT_PROGRESS,
            )

        if "budget" in text and "project" in text:
            return IntentResult(
                intent=AIIntent.PROJECT_ANALYSIS,
                sub_intent=AISubIntent.PROJECT_BUDGET,
            )

        if "risk" in text and "project" in text:
            return IntentResult(
                intent=AIIntent.PROJECT_ANALYSIS,
                sub_intent=AISubIntent.PROJECT_RISK,
            )

        if "project" in text:
            return IntentResult(
                intent=AIIntent.PROJECT_ANALYSIS,
                sub_intent=AISubIntent.PROJECT_LIST,
            )

        # -------------------------
        # Employee
        # -------------------------

        if "workload" in text or "busy" in text:
            return IntentResult(
                intent=AIIntent.EMPLOYEE_ANALYSIS,
                sub_intent=AISubIntent.EMPLOYEE_WORKLOAD,
            )

        if "employee" in text:
            return IntentResult(
                intent=AIIntent.EMPLOYEE_ANALYSIS,
                sub_intent=AISubIntent.EMPLOYEE_LIST,
            )

        # -------------------------
        # Workflow
        # -------------------------

        if "workflow" in text and "fail" in text:
            return IntentResult(
                intent=AIIntent.WORKFLOW_ANALYSIS,
                sub_intent=AISubIntent.WORKFLOW_FAILURE,
            )

        if "workflow" in text:
            return IntentResult(
                intent=AIIntent.WORKFLOW_ANALYSIS,
                sub_intent=AISubIntent.WORKFLOW_STATUS,
            )

        # -------------------------
        # KPI
        # -------------------------

        if "summary" in text:
            return IntentResult(
                intent=AIIntent.KPI_SUMMARY,
                sub_intent=AISubIntent.KPI_SUMMARY,
            )

        # -------------------------
        # Sales
        # -------------------------

        if "sales" in text:
            return IntentResult(
                intent=AIIntent.SALES_ANALYSIS,
                sub_intent=AISubIntent.GENERAL,
            )

        # -------------------------
        # Default
        # -------------------------

        return IntentResult(
            intent=AIIntent.CHAT,
            sub_intent=AISubIntent.GENERAL,
        )