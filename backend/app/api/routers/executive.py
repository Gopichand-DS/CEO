from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.database import get_db
from app.schemas.decision import ExecutiveDecisionResponse
from app.services.executive_decision_service import (
    ExecutiveDecisionService,
)

router = APIRouter(
    prefix="/executive",
    tags=["Executive"],
)


@router.get(
    "/decisions",
    response_model=ExecutiveDecisionResponse,
)
def get_executive_decisions(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return ExecutiveDecisionService.generate_decisions(
        db=db,
        company_id=current_user.company_id,
    )