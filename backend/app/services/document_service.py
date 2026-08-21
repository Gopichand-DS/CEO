from pathlib import Path

from fastapi import UploadFile

from sqlalchemy.orm import Session

from app.models.document import Document

from app.repositories.document_repository import (
    DocumentRepository,
)

from app.rag.services.document_ingestion_service import (
    DocumentIngestionService,
)


class DocumentService:

    STORAGE_DIR = Path("storage/documents")

    @classmethod
    def upload(
        cls,
        db: Session,
        company_id: int,
        user_id: int,
        file: UploadFile,
    ):

        cls.STORAGE_DIR.mkdir(
            parents=True,
            exist_ok=True,
        )

        destination = (
            cls.STORAGE_DIR /
            file.filename
        )

        with open(destination, "wb") as buffer:

            buffer.write(
                file.file.read()
            )

        document = Document(

            company_id=company_id,

            uploaded_by=user_id,

            name=file.filename,

            file_name=file.filename,

            file_type=file.content_type,

            file_size=destination.stat().st_size,

            storage_path=str(destination),

        )

        document = DocumentRepository.create(
            db,
            document,
        )

        DocumentIngestionService.ingest(
            db=db,
            document=document,
        )

        return document