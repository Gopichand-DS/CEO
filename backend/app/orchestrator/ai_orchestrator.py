from sqlalchemy.orm import Session

from app.services.intent_service import IntentService
from app.services.context_service import ContextService
from app.services.prompt_service import PromptService
from app.services.ai_provider_service import AIProviderService


class AIOrchestrator:

    @staticmethod
    def execute(
        db: Session,
        company_id: int,
        user_message: str,
    ):

        intent = IntentService.detect(
            message=user_message,
        )

        context = ContextService.build(
            db=db,
            company_id=company_id,
            intent=intent,
        )

        prompt = PromptService.generate(
            intent=intent,
            context=context,
            user_message=user_message,
        )

        response = AIProviderService.generate(
            prompt=prompt,
        )

        return response