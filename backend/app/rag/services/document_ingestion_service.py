from sqlalchemy.orm import Session

from app.models.document import Document

from app.rag.parsers.parser_factory import ParserFactory
from app.rag.vector.vector_repository import VectorRepository
from app.rag.chunking.text_chunker import TextChunker
from app.rag.embeddings.embedding_service import EmbeddingService

from app.repositories.document_chunk_repository import (
    DocumentChunkRepository,
)


class DocumentIngestionService:

    @staticmethod
    def ingest(
        db: Session,
        document: Document,
    ):

        parser = ParserFactory.get_parser(
            document.storage_path,
        )

        text = parser.parse(
            document.storage_path,
        )

        chunks = TextChunker.chunk(
            text,
        )

        records = DocumentChunkRepository.save_chunks(
            db=db,
            document_id=document.id,
            chunks=chunks,
        )

        # Make sure database-generated chunk IDs exist
        db.flush()

        for record in records:

            embedding = EmbeddingService.embed(
                record.content,
            )

            record.embedding = embedding

            VectorRepository.upsert(
                chunk_id=record.id,
                document_id=document.id,
                company_id=document.company_id,
                content=record.content,
                embedding=embedding,
            )

        db.commit()

        return records