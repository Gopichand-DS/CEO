from app.rag.embeddings.provider_factory import (
    EmbeddingProviderFactory,
)


class EmbeddingService:

    @staticmethod
    def embed(
        text: str,
    ) -> list[float]:

        provider = (
            EmbeddingProviderFactory
            .get_provider()
        )

        return provider.embed(text)