from qdrant_client.models import (
    PointStruct,
    Filter,
    FieldCondition,
    MatchValue,
    VectorParams,
    Distance,
)

from app.core.config import settings
from app.rag.vector.qdrant_client import (
    QdrantConnection,
)


class VectorRepository:

    VECTOR_SIZE = 768

    @staticmethod
    def initialize():
        """
        Ensure the configured Qdrant collection exists
        with the vector dimension used by Gemini Embedding 2.
        """

        client = QdrantConnection.client()

        collections = client.get_collections()

        collection_exists = any(
            collection.name == settings.qdrant_collection
            for collection in collections.collections
        )

        if not collection_exists:
            client.create_collection(
                collection_name=settings.qdrant_collection,
                vectors_config=VectorParams(
                    size=VectorRepository.VECTOR_SIZE,
                    distance=Distance.COSINE,
                ),
            )

    @staticmethod
    def upsert(
        chunk_id: int,
        document_id: int,
        company_id: int,
        content: str,
        embedding: list[float],
    ):

        client = QdrantConnection.client()

        client.upsert(
            collection_name=settings.qdrant_collection,
            points=[
                PointStruct(
                    id=chunk_id,
                    vector=embedding,
                    payload={
                        "document_id": document_id,
                        "company_id": company_id,
                        "content": content,
                    },
                )
            ],
        )

    @staticmethod
    def search(
        embedding: list[float],
        company_id: int,
        limit: int = 5,
    ):

        client = QdrantConnection.client()

        return client.query_points(
            collection_name=settings.qdrant_collection,
            query=embedding,
            query_filter=Filter(
                must=[
                    FieldCondition(
                        key="company_id",
                        match=MatchValue(
                            value=company_id,
                        ),
                    )
                ]
            ),
            limit=limit,
        )