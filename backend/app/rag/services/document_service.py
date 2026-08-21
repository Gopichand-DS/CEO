from sqlalchemy.orm import Session

from app.models.document import Document

from app.rag.services.document_ingestion_service import (
    DocumentIngestionService,
)


class DocumentService:

    @staticmethod
    def process_document(
        db: Session,
        document: Document,
    ):

        return DocumentIngestionService.ingest(
            db=db,
            document=document,
        )