from sqlalchemy.orm import Session

from app.repositories.message_repository import (
    MessageRepository,
)


class MemoryManager:

    MAX_HISTORY = 20

    @staticmethod
    def get_history(
        db: Session,
        conversation_id: int,
    ):

        messages = (
            MessageRepository.get_conversation_messages(
                db=db,
                conversation_id=conversation_id,
            )
        )

        history = []

        for message in messages[-MemoryManager.MAX_HISTORY:]:

            history.append(
                {
                    "role": message.role,
                    "content": message.content,
                }
            )

        return history