from sqlalchemy.orm import Session

from app.models.document import Document


class DocumentRepository:

    @staticmethod
    def create(
        db: Session,
        document: Document,
    ):

        db.add(document)
        db.commit()
        db.refresh(document)

        return document

    @staticmethod
    def get_by_company(
        db: Session,
        company_id: int,
    ):

        return (
            db.query(Document)
            .filter(
                Document.company_id == company_id,
            )
            .order_by(Document.created_at.desc())
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        document_id: int,
    ):

        return (
            db.query(Document)
            .filter(
                Document.id == document_id,
            )
            .first()
        )

    @staticmethod
    def delete(
        db: Session,
        document: Document,
    ):

        db.delete(document)
        db.commit()