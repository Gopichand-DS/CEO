from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.core.dependencies import (
    get_current_user,
)

from app.schemas.finance import (
    FinanceCreate,
    FinanceUpdate,
    FinanceResponse,
)

from app.services.finance_service import (
    FinanceService,
)


router = APIRouter(
    prefix="/finances",
    tags=["Finance"],
)


@router.post(
    "",
    response_model=FinanceResponse,
)
def create_finance(
    finance: FinanceCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return FinanceService.create(
        db=db,
        finance=finance,
        company_id=current_user.company_id,
    )


@router.get(
    "",
    response_model=list[FinanceResponse],
)
def get_finances(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return FinanceService.get_all(
        db=db,
        company_id=current_user.company_id,
    )


@router.get(
    "/{finance_id}",
    response_model=FinanceResponse,
)
def get_finance(
    finance_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return FinanceService.get_by_id(
        db=db,
        finance_id=finance_id,
        company_id=current_user.company_id,
    )


@router.put(
    "/{finance_id}",
    response_model=FinanceResponse,
)
def update_finance(
    finance_id: int,
    finance: FinanceUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return FinanceService.update(
        db=db,
        finance_id=finance_id,
        finance=finance,
        company_id=current_user.company_id,
    )


@router.delete(
    "/{finance_id",
)
def delete_finance(
    finance_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    FinanceService.delete(
        db=db,
        finance_id=finance_id,
        company_id=current_user.company_id,
    )

    return {
        "message": "Finance record deleted successfully."
    }