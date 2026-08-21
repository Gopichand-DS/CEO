from sqlalchemy.orm import Session

from app.services.memory_service import (
    MemoryService,
)


class MemoryManager:

    @staticmethod
    def remember_user(
        db: Session,
        company_id: int,
        user_id: int,
        message: str,
    ):

        MemoryService.save_message(
            db=db,
            company_id=company_id,
            user_id=user_id,
            role="USER",
            message=message,
        )

    @staticmethod
    def remember_ai(
        db: Session,
        company_id: int,
        user_id: int,
        message: str,
    ):

        MemoryService.save_message(
            db=db,
            company_id=company_id,
            user_id=user_id,
            role="AI",
            message=message,
        )

    @staticmethod
    def conversation_history(
        db: Session,
        company_id: int,
        user_id: int,
    ):

        return MemoryService.get_history(
            db=db,
            company_id=company_id,
            user_id=user_id,
        )