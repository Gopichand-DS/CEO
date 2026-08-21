from sqlalchemy.orm import Session

from app.services.intent_service import IntentService
from app.orchestrator.agent_router import AgentRouter

from app.services.prompt_service import PromptService
from app.services.ai_provider_service import AIProviderService


class ExecutiveOrchestrator:

    @staticmethod
    def execute(
        db: Session,
        company_id: int,
        message: str,
    ):

        intent = IntentService.detect(message)

        agent = AgentRouter.get_agent(intent)

        context = agent.execute(
            db=db,
            company_id=company_id,
            message=message,
        )

        prompt = PromptService.generate(
            intent=intent,
            context=context,
            user_message=message,
        )

        return AIProviderService.generate(
            prompt=prompt,
        )