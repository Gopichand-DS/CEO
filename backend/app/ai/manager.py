from app.ai.providers.base_provider import BaseProvider
from app.ai.providers.gemini_provider import GeminiProvider


class AIManager:

    _providers: dict[str, BaseProvider] = {
        "gemini": GeminiProvider(),
    }

    _default_provider = "gemini"

    @classmethod
    def get_provider(
        cls,
        provider_name: str | None = None,
    ) -> BaseProvider:

        if provider_name is None:
            provider_name = cls._default_provider

        return cls._providers[provider_name]

    @classmethod
    def generate(
        cls,
        prompt: str,
        provider: str | None = None,
    ) -> str:

        llm = cls.get_provider(provider)

        return llm.generate(prompt)

    @classmethod
    def register_provider(
        cls,
        name: str,
        provider: BaseProvider,
    ):

        cls._providers[name] = provider