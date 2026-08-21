from sqlalchemy.orm import Session

from app.orchestrator.memory_manager import (
    MemoryManager,
)


class ContextBuilder:

    @staticmethod
    def build(
        db: Session,
        conversation_id: int,
        agent_context: dict,
    ):

        history = MemoryManager.get_history(
            db=db,
            conversation_id=conversation_id,
        )

        return {
            "history": history,
            "business_context": agent_context,
        }