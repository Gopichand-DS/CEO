from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.database import get_db

from app.models.user import User

from app.schemas.investigation import (
    InvestigationRequest,
    InvestigationResponse,
)

from app.services.investigation_service import (
    InvestigationService,
)

router = APIRouter(
    prefix="/investigation",
    tags=["Investigation"],
)


@router.post(
    "/analyze",
    response_model=InvestigationResponse,
)
def investigate(
    request: InvestigationRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return InvestigationService.investigate(
        db=db,
        company_id=current_user.company_id,
        question=request.question,
    )