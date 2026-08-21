from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import get_current_user
from app.services.ai_health_service import AIHealthService
from app.schemas.ai import AIChatRequest
from app.services.executive_ai_service import ExecutiveAIService
from app.models.user import User


router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


@router.post("/chat")
def chat(
    request: AIChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ExecutiveAIService.chat(
        db=db,
        company_id=current_user.company_id,
        user_id=current_user.id,
        message=request.message,
    )


@router.get("/health")
def ai_health():
    return AIHealthService.health()