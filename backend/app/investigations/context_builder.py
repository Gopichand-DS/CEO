from sqlalchemy.orm import Session

from app.investigations.investigation_context import (
    InvestigationContext,
)

from app.memory.memory_manager import MemoryManager

from app.investigations.repository import (
    InvestigationRepository,
)


class ContextBuilder:

    @staticmethod
    def build(
        db: Session,
        company_id: int,
        question: str,
        user_id: int,
        intent,
        analyzer_result,
        tool_result=None,
    ) -> InvestigationContext:

        history = MemoryManager.conversation_history(
            db=db,
            company_id=company_id,
            user_id=user_id,
        )

        metrics = InvestigationRepository.collect_company_metrics(
            db=db,
            company_id=company_id,
        )

        return InvestigationContext(
            question=question,
            intent=intent,

            executive_analytics=metrics["executive"],

            project_analytics=metrics["projects"],

            task_analytics=metrics["tasks"],

            employee_analytics=metrics["employees"],

            workflow_analytics=metrics["workflows"],

            ai_analytics=metrics["ai"],

            conversation_history=history.messages,
        )