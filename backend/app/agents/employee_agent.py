from sqlalchemy.orm import Session

from app.agents.base_agent import BaseAgent
from app.repositories.employee_repository import EmployeeRepository


class EmployeeAgent(BaseAgent):

    def execute(
        self,
        db: Session,
        company_id: int,
        message: str,
    ):

        analytics = EmployeeRepository.get_employee_analytics(
            db=db,
            company_id=company_id,
        )

        employees = EmployeeRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        return {
            "analytics": analytics,
            "employees": employees,
        }