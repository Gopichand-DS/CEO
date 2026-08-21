from abc import ABC, abstractmethod

from app.ai.contracts.llm_request import LLMRequest
from app.ai.contracts.llm_response import LLMResponse


class BaseProvider(ABC):
    """Abstract base class for all LLM providers."""

    @property
    @abstractmethod
    def provider_name(self) -> str:
        """Return provider name."""
        raise NotImplementedError

    @property
    @abstractmethod
    def model_name(self) -> str:
        """Return active model name."""
        raise NotImplementedError

    @abstractmethod
    def generate(self, request: LLMRequest) -> LLMResponse:
        """Generate an AI response."""
        raise NotImplementedError

    @abstractmethod
    def health_check(self) -> bool:
        """Verify provider connectivity."""
        raise NotImplementedError