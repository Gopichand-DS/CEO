from sqlalchemy.orm import Session

from app.tools.base_tool import BaseTool
from app.repositories.employee_repository import (
    EmployeeRepository,
)


class EmployeeTool(BaseTool):

    @property
    def tool_name(self):
        return "employee_tool"

    def execute(
        self,
        db: Session,
        company_id: int,
        **kwargs,
    ):

        return {
            "analytics":
                EmployeeRepository.get_employee_analytics(
                    db=db,
                    company_id=company_id,
                ),

            "employees":
                EmployeeRepository.get_all_by_company(
                    db=db,
                    company_id=company_id,
                ),
        }