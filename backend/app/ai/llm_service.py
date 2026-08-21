from app.ai.contracts.llm_request import LLMRequest
from app.ai.contracts.llm_response import LLMResponse
from app.ai.providers.base_provider import BaseProvider
from app.ai.providers.gemini_provider import GeminiProvider
from app.core.config import settings


class LLMService:
    """Service responsible for communicating with the configured LLM provider."""

    def __init__(self):
        self.provider = self._get_provider()

    def _get_provider(self) -> BaseProvider:
        provider = settings.ai_provider.lower()

        
        if provider == "gemini":
            return GeminiProvider()

        raise ValueError(f"Unsupported AI provider: {provider}")

    def generate(self, request: LLMRequest) -> LLMResponse:
        return self.provider.generate(request)

    def health_check(self) -> bool:
        return self.provider.health_check()