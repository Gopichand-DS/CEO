from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.database import get_db

from app.schemas.report import ExecutiveReport

from app.services.report_service import (
    ReportService,
)


router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


@router.get(
    "/executive",
    response_model=ExecutiveReport,
)
def generate_executive_report(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return ReportService.generate_executive_report(
        db=db,
        company_id=current_user.company_id,
    )   