from sqlalchemy.orm import Session

from app.models.department import Department
from app.schemas.department import DepartmentCreate, DepartmentUpdate


class DepartmentRepository:

    @staticmethod
    def create(
        db: Session,
        department: DepartmentCreate,
    ) -> Department:

        db_department = Department(
            name=department.name,
            description=department.description,
            company_id=department.company_id,
        )

        db.add(db_department)
        db.commit()
        db.refresh(db_department)

        return db_department

    @staticmethod
    def get_all(
        db: Session,
        company_id: int,
    ) -> list[Department]:

        return (
            db.query(Department)
            .filter(
                Department.company_id == company_id
            )
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        department_id: int,
        company_id: int,
    ) -> Department | None:

        return (
            db.query(Department)
            .filter(
                Department.id == department_id,
                Department.company_id == company_id,
            )
            .first()
        )

    @staticmethod
    def update(
        db: Session,
        department_id: int,
        company_id: int,
        department: DepartmentUpdate,
    ) -> Department | None:

        db_department = (
            db.query(Department)
            .filter(
                Department.id == department_id,
                Department.company_id == company_id,
            )
            .first()
        )

        if not db_department:
            return None

        update_data = department.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_department, key, value)

        db.commit()
        db.refresh(db_department)

        return db_department

    @staticmethod
    def delete(
        db: Session,
        department_id: int,
        company_id: int,
    ) -> bool:

        db_department = (
            db.query(Department)
            .filter(
                Department.id == department_id,
                Department.company_id == company_id,
            )
            .first()
        )

        if not db_department:
            return False

        db.delete(db_department)
        db.commit()

        return True

    @staticmethod
    def get_by_name(
        db: Session,
        company_id: int,
        name: str,
    ):
     return (
        db.query(Department)
        .filter(
            Department.company_id == company_id,
            Department.name == name,
        )
        .first()
    )