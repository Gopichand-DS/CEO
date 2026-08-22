from qdrant_client import QdrantClient

from app.core.config import settings


class QdrantConnection:

    _client = None

    @classmethod
    def client(cls):

        if cls._client is None:

            cls._client = QdrantClient(
                url=settings.qdrant_url,
                api_key=settings.qdrant_api_key,
            )

        return cls._client