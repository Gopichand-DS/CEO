from sqlalchemy.orm import Session
from app.models.user import User
from app.models.company import Company
from app.schemas.company import CompanyCreate


class CompanyRepository:

    @staticmethod
    def create(db: Session, company: CompanyCreate):
        db_company = Company(
            name=company.name,
            industry=company.industry,
            country=company.country,
        )

        db.add(db_company)
        db.commit()
        db.refresh(db_company)

        return db_company

    @staticmethod
    def get_all(db: Session):
        return db.query(Company).all()

    @staticmethod
    def get_by_id(
        db: Session,
        company_id: int,
        current_user: User,
    ):
        query = db.query(Company)

        if current_user.role != "SUPER_ADMIN":
            query = query.filter(
                Company.id == current_user.company_id
            )

        return (
            query
            .filter(Company.id == company_id)
            .first()
        )

    @staticmethod
    def update(db: Session, company_id: int, company: CompanyCreate):
        db_company = db.query(Company).filter(Company.id == company_id).first()

        if not db_company:
            return None

        db_company.name = company.name
        db_company.industry = company.industry
        db_company.country = company.country

        db.commit()
        db.refresh(db_company)

        return db_company

    @staticmethod
    def delete(db: Session, company_id: int):
        db_company = db.query(Company).filter(Company.id == company_id).first()

        if not db_company:
            return None

        db.delete(db_company)
        db.commit()

        return db_company