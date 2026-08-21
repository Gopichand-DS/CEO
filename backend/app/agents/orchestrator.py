from sqlalchemy.orm import Session

from app.agents.dashboard_agent import DashboardAgent
from app.agents.executive_agent import ExecutiveAgent
from app.agents.finance_agent import FinanceAgent
from app.agents.workflow_agent import WorkflowAgent

from app.agents.dispatcher import (
    Dispatcher,
    AgentType,
)

from app.investigations.intent_classifier import (
    IntentClassifier,
)


class AIOrchestrator:

    @staticmethod
    def execute(
        db: Session,
        company_id: int,
        question: str,
    ):

        intent = IntentClassifier.classify(question)

        agent = Dispatcher.dispatch(intent)

        if agent == AgentType.INVESTIGATION:
            return ExecutiveAgent.process(
                db=db,
                company_id=company_id,
                question=question,
            )

        if agent == AgentType.DASHBOARD:
            return DashboardAgent.process(
                db=db,
                company_id=company_id,
            )

        if agent == AgentType.WORKFLOW:
            return WorkflowAgent.process(
                db=db,
                company_id=company_id,
            )

        if agent == AgentType.FINANCE:
            return FinanceAgent.process(
                db=db,
                company_id=company_id,
            )

        return {
            "message": "No suitable agent found."
        }