from app.rag.embeddings.embedding_service import (
    EmbeddingService,
)

from app.rag.vector.vector_repository import (
    VectorRepository,
)


class Retriever:

    @staticmethod
    def retrieve(
        question: str,
        company_id: int,
        limit: int = 5,
    ):

        embedding = EmbeddingService.embed(
            question,
        )

        results = VectorRepository.search(
            embedding=embedding,
            company_id=company_id,
            limit=limit,
        )

        documents = []

        for point in results.points:

            payload = point.payload or {}

            content = payload.get(
                "content",
                "",
            )

            if not content:
                continue

            documents.append(
                {
                    "document_id": payload.get(
                        "document_id"
                    ),
                    "company_id": payload.get(
                        "company_id"
                    ),
                    "content": content,
                    "score": point.score,
                }
            )

        return documents