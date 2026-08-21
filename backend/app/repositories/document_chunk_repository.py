from sqlalchemy.orm import Session

from app.models.document_chunk import DocumentChunk


class DocumentChunkRepository:

    @staticmethod
    def save_chunks(
        db: Session,
        document_id: int,
        chunks: list[str],
    ):

        records = []

        for index, chunk in enumerate(chunks):

            records.append(

                DocumentChunk(

                    document_id=document_id,

                    chunk_index=index,

                    content=chunk,

                )

            )

        db.add_all(records)

        db.commit()

        return records

    @staticmethod
    def get_document_chunks(
        db: Session,
        document_id: int,
    ):

        return (

            db.query(DocumentChunk)

            .filter(
                DocumentChunk.document_id == document_id,
            )

            .order_by(
                DocumentChunk.chunk_index
            )

            .all()

        )