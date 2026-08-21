from app.core.config import settings

from app.rag.embeddings.gemini_embedding_provider import (
    GeminiEmbeddingProvider,
)


class EmbeddingProviderFactory:

    _providers = {}

    @classmethod
    def get_provider(cls):

        provider = settings.ai_provider.lower()

        if provider not in cls._providers:

            if provider == "gemini":

                cls._providers[
                    provider
                ] = GeminiEmbeddingProvider()

            else:

                raise ValueError(
                    f"Embedding provider "
                    f"{provider} "
                    f"not supported."
                )

        return cls._providers[provider]