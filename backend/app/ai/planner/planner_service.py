from sqlalchemy.orm import Session

from app.ai.planner.planner import Planner
from app.ai.planner.execution_plan import ExecutionPlan

from app.investigations.intent_classifier import (
    IntentClassifier,
)


class PlannerService:

    @staticmethod
    def create_plan(
        db: Session,
        company_id: int,
        question: str,
    ) -> ExecutionPlan:
        """
        Create an execution plan for the user's request.
        """

        intent = IntentClassifier.classify(
            question,
        )

        plan = Planner.build(
            intent=intent,
            question=question,
        )

        return plan