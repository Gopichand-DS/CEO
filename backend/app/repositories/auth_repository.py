from sqlalchemy.orm import Session

from app.models.user import User
from app.models.company import Company
from app.models.department import Department


class AuthRepository:
    """
    Repository responsible for authentication-related
    database operations.
    """

    DEFAULT_DEPARTMENTS = [
        "Engineering",
        "Backend developer",
        "Data Analysis",
        "ML engineer",
        "Data Scientist",
        "Investors",
        "Developer Department",
        "Managing Department",
        "Marketing",
        "Finance",
        "Human Resources",
        "Operations",
        "Sales",
    ]

    @staticmethod
    def get_user_by_email(
        db: Session,
        email: str,
    ) -> User | None:
        return (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

    @staticmethod
    def email_exists(
        db: Session,
        email: str,
    ) -> bool:
        return (
            db.query(User)
            .filter(User.email == email)
            .first()
            is not None
        )

    @staticmethod
    def create_company(
        db: Session,
        company_name: str,
    ) -> Company:
        company = Company(
            name=company_name
        )

        db.add(company)
        db.flush()

        return company

    @staticmethod
    def create_default_departments(
        db: Session,
        company_id: int,
    ) -> list[Department]:
        departments = []

        for department_name in AuthRepository.DEFAULT_DEPARTMENTS:
            department = Department(
                name=department_name,
                description=f"{department_name} Department",
                company_id=company_id,
            )

            db.add(department)
            departments.append(department)

        db.flush()

        return departments

    @staticmethod
    def create_user(
        db: Session,
        user: User,
    ) -> User:
        db.add(user)
        db.flush()

        return user

    @staticmethod
    def get_user_by_id(
        db: Session,
        user_id: int,
    ) -> User | None:
        return (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

    @staticmethod
    def create_missing_default_departments(
            db: Session,
            company_id: int,
        ) -> list[Department]:
            existing_names = {
                department.name
                for department in (
                    db.query(Department)
                    .filter(
                        Department.company_id == company_id
                    )
                    .all()
                )
            }

            created_departments = []

            for department_name in AuthRepository.DEFAULT_DEPARTMENTS:
                if department_name in existing_names:
                    continue

                department = Department(
                    name=department_name,
                    description=f"{department_name} Department",
                    company_id=company_id,
                )

                db.add(department)
                created_departments.append(department)

            db.flush()

            return created_departments