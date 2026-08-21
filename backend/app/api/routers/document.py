from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
)

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.core.dependencies import (
    get_current_user,
)
from app.schemas.ai import AIChatRequest
from app.models.user import User

from app.schemas.document import (
    DocumentResponse,
)
from app.services.document_ai_service import DocumentAIService
from app.services.document_service import (
    DocumentService,
)

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.post(
    "/upload",
    response_model=DocumentResponse,
)
def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):

    return DocumentService.upload(
        db=db,
        company_id=current_user.company_id,
        user_id=current_user.id,
        file=file,
    )

@router.post("/ask")
def ask_document(

    request: AIChatRequest,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user,
    ),

):

    return DocumentAIService.ask_document(

        db=db,

        company_id=current_user.company_id,

        user_id=current_user.id,

        question=request.message,

    )