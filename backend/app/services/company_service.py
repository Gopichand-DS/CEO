from sqlalchemy.orm import Session
from app.models.user import User
from app.repositories.company_repository import CompanyRepository
from app.schemas.company import CompanyCreate
from fastapi import HTTPException, status

class CompanyService:

    @staticmethod
    def create_company(db: Session, company: CompanyCreate):
        return CompanyRepository.create(db, company)

    @staticmethod
    def get_companies(db: Session):
        return CompanyRepository.get_all(db)

    @staticmethod
    def get_company(db: Session, company_id: int, current_user: User):
        company = CompanyRepository.get_by_id(db, company_id, current_user)
        if company is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Company not found",
            )

        return company

    @staticmethod
    def update_company(db: Session, company_id: int, company: CompanyCreate):
        company = CompanyRepository.update(db, company_id, company)
        if company is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Company not found",
            )
        return company



    @staticmethod
    def delete_company(db: Session, company_id: int):
        company = CompanyRepository.delete(db, company_id)
        if company is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Company not found",
            )
        return company