from sqlalchemy.orm import Session

from app.models.conversation import Conversation
from app.repositories.conversation_repository import (
    ConversationRepository,
)


class ConversationService:

    @staticmethod
    def create(
        db: Session,
        title: str,
        company_id: int,
        user_id: int,
    ):

        conversation = Conversation(
            title=title or "New Conversation",
            company_id=company_id,
            user_id=user_id,
        )

        return ConversationRepository.create(
            db=db,
            conversation=conversation,
        )

    @staticmethod
    def get_all(
        db: Session,
        company_id: int,
    ):
        return ConversationRepository.get_by_company(
            db=db,
            company_id=company_id,
        )

    @staticmethod
    def get(
        db: Session,
        conversation_id: int,
    ):
        return ConversationRepository.get_by_id(
            db=db,
            conversation_id=conversation_id,
        )

    @staticmethod
    def delete(
        db: Session,
        conversation: Conversation,
    ):
        ConversationRepository.delete(
            db=db,
            conversation=conversation,
        )

    @staticmethod
    def delete_by_id(
        db: Session,
        conversation_id: int,
        company_id: int,
    ):

        conversation = ConversationRepository.get_by_id(
            db=db,
            conversation_id=conversation_id,
        )

        if (
            conversation is None
            or conversation.company_id != company_id
        ):
             raise ValueError("Conversation not found.")

        ConversationRepository.delete(
            db=db,
            conversation=conversation,
        )