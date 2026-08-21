from sqlalchemy.orm import Session

from app.models.message import Message

from app.repositories.message_repository import (
    MessageRepository,
)

from app.repositories.conversation_repository import (
    ConversationRepository,
)
from app.orchestrator.ai_orchestrator import AIOrchestrator
from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
)

from app.services.conversation_service import (
    ConversationService,
)


class ChatService:

    @staticmethod
    def send_message(
        db: Session,
        company_id: int,
        user_id: int,
        request: ChatRequest,
    ):

        conversation = None

        if request.conversation_id:

            conversation = ConversationRepository.get_by_id(
                db=db,
                conversation_id=request.conversation_id,
            )

        if conversation is None:

            conversation = ConversationService.create(
                db=db,
                title=request.message[:50],
                company_id=company_id,
                user_id=user_id,
            )

        user_message = Message(
            conversation_id=conversation.id,
            role="user",
            content=request.message,
        )

        MessageRepository.create(
            db=db,
            message=user_message,
        )

        ai_response = AIOrchestrator.execute(
            db=db,
            company_id=company_id,
            user_message=request.message,
)  

        assistant_message = Message(
            conversation_id=conversation.id,
            role="assistant",
            content=ai_response,
        )

        MessageRepository.create(
            db=db,
            message=assistant_message,
        )

        return ChatResponse(
            conversation_id=conversation.id,
            response=ai_response,
        )

    @staticmethod
    def get_messages(
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
            return []

        return MessageRepository.get_conversation_messages(
            db=db,
            conversation_id=conversation_id,
        )