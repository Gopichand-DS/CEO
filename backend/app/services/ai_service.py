from sqlalchemy.orm import Session

from app.ai.orchestrator import AIOrchestrator
from app.schemas.ai import AIChatRequest


class AIService:

    @staticmethod
    async def chat(
        db: Session,
        request: AIChatRequest,
    ):

        return await AIOrchestrator.execute(
            db=db,
            prompt=request.message,
        )