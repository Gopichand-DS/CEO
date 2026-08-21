from fastapi import HTTPException
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.company import CompanyCreate, CompanyResponse
from app.services.company_service import CompanyService

from app.core.dependencies import (
    get_current_user,
    require_role,
)

from app.models.user import User

router = APIRouter(
    prefix="/companies",
    tags=["Companies"],
)


@router.post("/", response_model=CompanyResponse)
def create_company(
    company: CompanyCreate,
    db: Session = Depends(get_db),

    current_user: User = Depends(
        require_role(["SUPER_ADMIN"])
    ),
):
    return CompanyService.create_company(db, company)


@router.get("/", response_model=list[CompanyResponse])
def get_companies(
    db: Session = Depends(get_db),
):
    return CompanyService.get_companies(db)


@router.put("/{company_id}", response_model=CompanyResponse)
def update_company(
    company_id: int,
    company: CompanyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
    require_role([
        "SUPER_ADMIN",
        "ADMIN",
        "EMPLOYEE",
        "CEO",
        "MANAGER",
        ])
    ),
):
    updated = CompanyService.update_company(db, company_id, company)

    if not updated:
        raise HTTPException(status_code=404, detail="Company not found")

    return updated


@router.delete("/{company_id}")
def delete_company(company_id: int, db: Session = Depends(get_db)):
    deleted = CompanyService.delete_company(db, company_id)
    current_user: User = Depends(
    require_role(["SUPER_ADMIN"])
    ),
    if not deleted:
        raise HTTPException(status_code=404, detail="Company not found")

    return {"message": "Company deleted successfully"}

@router.get(
    "/{company_id}",
    response_model=CompanyResponse,
)
def get_company(
    company_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    company = CompanyService.get_company(
        db,
        company_id,
        current_user,
    )

    if not company:
        raise HTTPException(
            status_code=404,
            detail="Company not found",
        )

    return company
