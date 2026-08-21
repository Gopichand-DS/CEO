from collections import Counter
from datetime import date, timedelta

from sqlalchemy.orm import Session

from app.models.employee import Employee


class EmployeeDashboardRepository:

    @staticmethod
    def get_employee_overview(
        db: Session,
        company_id: int,
    ):

        employees = (
            db.query(Employee)
            .filter(Employee.company_id == company_id)
            .all()
        )

        total_employees = len(employees)

        active_employees = sum(
            1
            for employee in employees
            if employee.status.upper() == "ACTIVE"
        )

        on_leave = sum(
            1
            for employee in employees
            if employee.status.upper() == "ON_LEAVE"
        )

        thirty_days_ago = date.today() - timedelta(days=30)

        new_joinees = sum(
            1
            for employee in employees
            if employee.joining_date >= thirty_days_ago
        )

        department_counter = Counter()

        for employee in employees:
            if employee.department:
                department_counter[
                    employee.department.name
                ] += 1

        departments = [
            {
                "department": name,
                "employees": count,
            }
            for name, count in department_counter.items()
        ]

        return {
            "total_employees": total_employees,
            "active_employees": active_employees,
            "on_leave": on_leave,
            "new_joinees": new_joinees,
            "departments": departments,
        }