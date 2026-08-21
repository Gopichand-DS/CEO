from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeUpdate


class EmployeeRepository:

    @staticmethod
    def create(db: Session, employee: EmployeeCreate):
        db_employee = Employee(
            employee_code=employee.employee_code,
            full_name=employee.full_name,
            email=employee.email,
            phone=employee.phone,
            designation=employee.designation,
            company_id=employee.company_id,
            department_id=employee.department_id,
            team_id=employee.team_id,
            manager_id=employee.manager_id,
            joining_date=employee.joining_date,
            salary=employee.salary,
            status=employee.status,
        )

        db.add(db_employee)
        db.commit()
        db.refresh(db_employee)

        return db_employee
    
    @staticmethod
    def get_all(
        db: Session,
        company_id: int,
    ):
        return (
            db.query(Employee)
            .filter(
                Employee.company_id == company_id
            )
            .all()
        )

    
    @staticmethod
    def get_by_id(
        db: Session,
        employee_id: int,
        company_id: int,
    ):
        return (
            db.query(Employee)
            .filter(
                Employee.id == employee_id,
                Employee.company_id == company_id,
            )
            .first()
        )

    @staticmethod
    def update(
        db: Session,
        employee_id: int,
        company_id: int,
        employee: EmployeeUpdate,
    ):
        db_employee = (
            db.query(Employee)
            .filter(
                Employee.id == employee_id,
                Employee.company_id == company_id,
            )
            .first()
        )

        if not db_employee:
            return None

        update_data = employee.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_employee, key, value)

        db.commit()
        db.refresh(db_employee)

        return db_employee

    @staticmethod
    def delete(
        db: Session,
        employee_id: int,
        company_id: int,
    ):
        db_employee = (
            db.query(Employee)
            .filter(
                Employee.id == employee_id,
                Employee.company_id == company_id,
            )
            .first()
        )

        if not db_employee:
            return None

        db.delete(db_employee)
        db.commit()

        return db_employee

    @staticmethod
    def get_all_by_company(
        db: Session,
        company_id: int,
    ):
        return (
            db.query(Employee)
            .filter(Employee.company_id == company_id)
            .all()
        )

    @staticmethod
    def get_employee_analytics(
        db: Session,
        company_id: int,
    ):

        employees = EmployeeRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        total_employees = len(employees)
        
        manager_count = sum(
            1 for employee in employees
            if employee.designation.upper() == "MANAGER"
        )

        active_employees = sum(
            1 for employee in employees
            if employee.status == "ACTIVE"
        )

        inactive_employees = sum(
            1 for employee in employees
            if employee.status == "INACTIVE"
        )

        assigned_to_team = sum(
            1 for employee in employees
            if employee.team_id is not None
        )

        unassigned = sum(
            1 for employee in employees
            if employee.team_id is None
        )

        return {
            
            "total_employees": total_employees,
            "active_employees": active_employees,
            "inactive_employees": inactive_employees,
            "manager_count": manager_count,
            "assigned_to_team": assigned_to_team,
            "unassigned_employees": unassigned,
        }