from app.ai.llm_service import LLMService
from app.schemas.ai_health import AIHealthResponse


class AIHealthService:

    @staticmethod
    def health() -> AIHealthResponse:

        llm = LLMService()

        return AIHealthResponse(
            provider=llm.provider.provider_name,
            model=llm.provider.model_name,
            healthy=llm.health_check(),
        )