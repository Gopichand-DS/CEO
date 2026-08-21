from app.ai.providers.provider_factory import ProviderFactory
from backend.app.ai.contracts.llm_request import LLMRequest
from backend.app.ai.contracts.llm_response import LLMResponse


class LLMService:

    def __init__(self):

        self.provider = ProviderFactory.get_provider()

    def generate(
        self,
        request: LLMRequest,
    ) -> LLMResponse:

        return self.provider.generate(request)

    def health_check(self):

        return self.provider.health_check()