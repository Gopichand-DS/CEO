from sqlalchemy.orm import Session

from app.repositories.memory_repository import (
    MemoryRepository,
)

from app.schemas.memory import (
    ConversationHistoryResponse,
    ConversationMemoryResponse,
)


class MemoryService:

    @staticmethod
    def save_message(
        db: Session,
        company_id: int,
        user_id: int,
        role: str,
        message: str,
    ):

        return MemoryRepository.save_message(
            db=db,
            company_id=company_id,
            user_id=user_id,
            role=role,
            message=message,
        )

    @staticmethod
    def get_history(
        db: Session,
        company_id: int,
        user_id: int,
    ) -> ConversationHistoryResponse:

        messages = MemoryRepository.get_recent_messages(
            db=db,
            company_id=company_id,
            user_id=user_id,
        )

        return ConversationHistoryResponse(
            messages=[
                ConversationMemoryResponse.model_validate(
                    message
                )
                for message in messages
            ]
        )

    @staticmethod
    def clear_history(
        db: Session,
        company_id: int,
        user_id: int,
    ):

        MemoryRepository.delete_history(
            db=db,
            company_id=company_id,
            user_id=user_id,
        )