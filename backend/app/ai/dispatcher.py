from sqlalchemy.orm import Session

from app.ai.intent import AIIntent
from app.ai.intent_result import IntentResult
from app.ai.providers.gemini_provider import GeminiProvider
from app.analyzers.project_analyzer import ProjectAnalyzer
from app.ai.task_analyzer import TaskAnalyzer

class AIDispatcher:

    @staticmethod
    async def dispatch(
        db: Session,
        company_id: int,
        intent_result: IntentResult,
        message: str,
    ):

        if intent_result.intent == AIIntent.PROJECT_ANALYSIS:
            return ProjectAnalyzer.analyze(
                db=db,
                company_id=company_id,
                message=message,
                sub_intent=intent_result.sub_intent,
            )

        if intent_result.intent == AIIntent.TASK_ANALYSIS:
            return TaskAnalyzer.analyze(
                db=db,
                company_id=company_id,
                message=message,
                sub_intent=intent_result.sub_intent,
            )
        
        provider = GeminiProvider()

        return await provider.generate(
            prompt=message,
        )