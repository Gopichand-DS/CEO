from qdrant_client import QdrantClient

from app.core.config import settings


class QdrantConnection:

    _client = None

    @classmethod
    def client(cls):

        if cls._client is None:

            cls._client = QdrantClient(
                host=settings.qdrant_host,
                port=settings.qdrant_port,
            )

        return cls._client