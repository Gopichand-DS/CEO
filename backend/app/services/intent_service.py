from enum import Enum


class AIIntent(str, Enum):

    GENERAL = "GENERAL"

    DASHBOARD = "DASHBOARD"

    EMPLOYEE = "EMPLOYEE"

    PROJECT = "PROJECT"

    TASK = "TASK"

    REPORT = "REPORT"

    INVESTIGATION = "INVESTIGATION"


class IntentService:

    @staticmethod
    def detect(
        message: str,
    ) -> AIIntent:

        message = message.lower()

        if "employee" in message:
            return AIIntent.EMPLOYEE

        if "project" in message:
            return AIIntent.PROJECT

        if "task" in message:
            return AIIntent.TASK

        if "dashboard" in message:
            return AIIntent.DASHBOARD

        if "report" in message:
            return AIIntent.REPORT

        if (
            "why" in message
            or "investigate" in message
            or "reason" in message
        ):
            return AIIntent.INVESTIGATION

        return AIIntent.GENERAL