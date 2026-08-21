from enum import Enum

from app.investigations.intent_classifier import (
    InvestigationIntent,
)


class AgentType(str, Enum):

    INVESTIGATION = "INVESTIGATION"

    DASHBOARD = "DASHBOARD"

    WORKFLOW = "WORKFLOW"

    FINANCE = "FINANCE"

    GENERAL = "GENERAL"


class Dispatcher:

    @staticmethod
    def dispatch(intent):

        if intent in [
            InvestigationIntent.PROJECT,
            InvestigationIntent.TASK,
            InvestigationIntent.EMPLOYEE,
        ]:
            return AgentType.INVESTIGATION

        if intent == InvestigationIntent.WORKFLOW:
            return AgentType.WORKFLOW

        if intent == InvestigationIntent.FINANCE:
            return AgentType.FINANCE

        if intent == InvestigationIntent.DASHBOARD:
            return AgentType.DASHBOARD

        return AgentType.GENERAL