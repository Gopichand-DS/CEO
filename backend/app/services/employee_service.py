from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.company import Company
from app.models.department import Department
from app.models.team import Team

from app.repositories.employee_repository import EmployeeRepository

from app.schemas.employee import (
    EmployeeCreate,
    EmployeeUpdate,
)


class EmployeeService:

    @staticmethod
    def create_employee(
        db: Session,
        employee: EmployeeCreate,
        company_id: int,
    ):
        # -----------------------------
        # Company validation
        # -----------------------------
        company = (
            db.query(Company)
            .filter(
                Company.id == company_id
            )
            .first()
        )

        if not company:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Company not found",
            )

        # -----------------------------
        # Department validation
        # -----------------------------
        department = (
            db.query(Department)
            .filter(
                Department.id == employee.department_id
            )
            .first()
        )

        if not department:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Department not found",
            )

        if department.company_id != company_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Department does not belong to the selected company",
            )

        # -----------------------------
        # Team validation
        # -----------------------------
        if employee.team_id is not None:

            team = (
                db.query(Team)
                .filter(
                    Team.id == employee.team_id
                )
                .first()
            )

            if not team:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Team not found",
                )

            if team.company_id != company_id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Team does not belong to the selected company",
                )

            if team.department_id != employee.department_id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Team does not belong to the selected department",
                )

        # -----------------------------
        # Force tenant ownership
        # -----------------------------
        employee_data = employee.model_dump()

        employee_data["company_id"] = company_id

        employee = EmployeeCreate(
            **employee_data
        )

        return EmployeeRepository.create(
            db=db,
            employee=employee,
        )

    @staticmethod
    def get_employees(
        db: Session,
        company_id: int,
    ):
        return EmployeeRepository.get_all(
            db=db,
            company_id=company_id,
        )

    @staticmethod
    def get_employee(
        db: Session,
        employee_id: int,
        company_id: int,
    ):
        employee = EmployeeRepository.get_by_id(
            db=db,
            employee_id=employee_id,
            company_id=company_id,
        )

        if employee is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Employee not found",
            )

        return employee

    @staticmethod
    def update_employee(
        db: Session,
        employee_id: int,
        employee: EmployeeUpdate,
        company_id: int,
    ):
        # -----------------------------
        # Existing employee
        # -----------------------------
        existing_employee = (
            EmployeeRepository.get_by_id(
                db=db,
                employee_id=employee_id,
                company_id=company_id,
            )
        )

        if existing_employee is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Employee not found",
            )

        # -----------------------------
        # Determine related entities
        # -----------------------------
        department_id = (
            employee.department_id
            if employee.department_id is not None
            else existing_employee.department_id
        )

        team_id = (
            employee.team_id
            if employee.team_id is not None
            else existing_employee.team_id
        )

        # -----------------------------
        # Department validation
        # -----------------------------
        department = (
            db.query(Department)
            .filter(
                Department.id == department_id
            )
            .first()
        )

        if not department:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Department not found",
            )

        if department.company_id != company_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Department does not belong to the selected company",
            )

        # -----------------------------
        # Team validation
        # -----------------------------
        if team_id is not None:

            team = (
                db.query(Team)
                .filter(
                    Team.id == team_id
                )
                .first()
            )

            if not team:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Team not found",
                )

            if team.company_id != company_id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Team does not belong to the selected company",
                )

            if team.department_id != department_id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Team does not belong to the selected department",
                )

        # -----------------------------
        # Prevent tenant reassignment
        # -----------------------------
        update_data = employee.model_dump(
            exclude_unset=True
        )

        update_data.pop(
            "company_id",
            None,
        )

        safe_update = EmployeeUpdate(
            **update_data
        )

        return EmployeeRepository.update(
            db=db,
            employee_id=employee_id,
            company_id=company_id,
            employee=safe_update,
        )

    @staticmethod
    def delete_employee(
        db: Session,
        employee_id: int,
        company_id: int,
    ):
        deleted_employee = (
            EmployeeRepository.delete(
                db=db,
                employee_id=employee_id,
                company_id=company_id,
            )
        )

        if deleted_employee is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Employee not found",
            )

        return deleted_employee