from sqlalchemy.orm import Session

from app.memory.conversation_memory import ConversationMemory


class MemoryRepository:

    @staticmethod
    def save_message(
        db: Session,
        company_id: int,
        user_id: int,
        role: str,
        message: str,
    ) -> ConversationMemory:

        memory = ConversationMemory(
            company_id=company_id,
            user_id=user_id,
            role=role,
            message=message,
        )

        db.add(memory)
        db.commit()
        db.refresh(memory)

        return memory

    @staticmethod
    def get_recent_messages(
        db: Session,
        company_id: int,
        user_id: int,
        limit: int = 10,
    ):

        return (
            db.query(ConversationMemory)
            .filter(
                ConversationMemory.company_id == company_id,
                ConversationMemory.user_id == user_id,
            )
            .order_by(
                ConversationMemory.created_at.desc()
            )
            .limit(limit)
            .all()
        )

    @staticmethod
    def delete_history(
        db: Session,
        company_id: int,
        user_id: int,
    ):

        (
            db.query(ConversationMemory)
            .filter(
                ConversationMemory.company_id == company_id,
                ConversationMemory.user_id == user_id,
            )
            .delete()
        )

        db.commit()