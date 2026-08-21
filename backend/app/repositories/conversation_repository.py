from sqlalchemy.orm import Session

from app.models.conversation import Conversation


class ConversationRepository:

    @staticmethod
    def create(
        db: Session,
        conversation: Conversation,
    ):
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

        return conversation

    @staticmethod
    def get_by_id(
        db: Session,
        conversation_id: int,
    ):
        return (
            db.query(Conversation)
            .filter(
                Conversation.id == conversation_id
            )
            .first()
        )

    @staticmethod
    def get_by_company(
        db: Session,
        company_id: int,
    ):
        return (
            db.query(Conversation)
            .filter(
                Conversation.company_id == company_id
            )
            .order_by(
                Conversation.updated_at.desc()
            )
            .all()
        )

    @staticmethod
    def update(
        db: Session,
        conversation: Conversation,
    ):
        db.commit()
        db.refresh(conversation)

        return conversation

    @staticmethod
    def delete(
        db: Session,
        conversation: Conversation,
    ):
        db.delete(conversation)
        db.commit()