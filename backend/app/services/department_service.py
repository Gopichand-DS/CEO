from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.company import Company
from app.schemas.department import (
    DepartmentCreate,
    DepartmentUpdate,
)
from app.repositories.department_repository import (
    DepartmentRepository,
)


class DepartmentService:

    @staticmethod
    def create_department(
        db: Session,
        department: DepartmentCreate,
        company_id: int,
    ):
        company = (
            db.query(Company)
            .filter(Company.id == company_id)
            .first()
        )

        if not company:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Company not found",
            )

        existing = DepartmentRepository.get_by_name(
            db=db,
            company_id=company_id,
            name=department.name,
        )

        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Department already exists",
            )

        department_data = department.model_dump()

        # The authenticated user's company is authoritative.
        department_data["company_id"] = company_id

        department_data = DepartmentCreate(
            **department_data
        )

        return DepartmentRepository.create(
            db=db,
            department=department_data,
        )

    @staticmethod
    def get_departments(
        db: Session,
        company_id: int,
    ):
        return DepartmentRepository.get_all(
            db=db,
            company_id=company_id,
        )

    @staticmethod
    def get_department(
        db: Session,
        department_id: int,
        company_id: int,
    ):
        department = DepartmentRepository.get_by_id(
            db=db,
            department_id=department_id,
            company_id=company_id,
        )

        if not department:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Department not found",
            )

        return department

    @staticmethod
    def update_department(
        db: Session,
        department_id: int,
        department: DepartmentUpdate,
        company_id: int,
    ):
        updated = DepartmentRepository.update(
            db=db,
            department_id=department_id,
            company_id=company_id,
            department=department,
        )

        if not updated:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Department not found",
            )

        return updated

    @staticmethod
    def delete_department(
        db: Session,
        department_id: int,
        company_id: int,
    ):
        deleted = DepartmentRepository.delete(
            db=db,
            department_id=department_id,
            company_id=company_id,
        )

        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Department not found",
            )

        return {
            "message": "Department deleted successfully"
        }