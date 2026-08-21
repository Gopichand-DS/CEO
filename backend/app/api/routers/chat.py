from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.core.dependencies import get_current_user

from app.models.user import User

from app.schemas.chat import (
    ConversationCreate,
    ConversationResponse,
    ChatRequest,
    ChatResponse,
    MessageResponse,
)

from app.services.chat_service import ChatService
from app.services.conversation_service import ConversationService

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"],
)


@router.post(
    "/conversation",
    response_model=ConversationResponse,
)
def create_conversation(
    request: ConversationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return ConversationService.create(
        db=db,
        title=request.title or "New Conversation",
        company_id=current_user.company_id,
        user_id=current_user.id,
    )


@router.get(
    "/conversation",
    response_model=list[ConversationResponse],
)
def get_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return ConversationService.get_all(
        db=db,
        company_id=current_user.company_id,
    )


@router.get(
    "/conversation/{conversation_id}",
    response_model=list[MessageResponse],
)
def get_messages(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return ChatService.get_messages(
        db=db,
        conversation_id=conversation_id,
        company_id=current_user.company_id,
    )


@router.post(
    "/message",
    response_model=ChatResponse,
)
def send_message(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return ChatService.send_message(
        db=db,
        company_id=current_user.company_id,
        user_id=current_user.id,
        request=request,
    )


@router.delete(
    "/conversation/{conversation_id}",
)
def delete_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    ConversationService.delete_by_id(
        db=db,
        conversation_id=conversation_id,
        company_id=current_user.company_id,
    )

    return {
        "message": "Conversation deleted successfully."
    }