from sqlalchemy.orm import Session

from app.tools.base_tool import BaseTool
from app.repositories.department_repository import (
    DepartmentRepository,
)


class DepartmentTool(BaseTool):

    @property
    def tool_name(self):
        return "department_tool"

    def execute(
        self,
        db: Session,
        company_id: int,
        **kwargs,
    ):

        departments = (
            DepartmentRepository.get_all_by_company(
                db=db,
                company_id=company_id,
            )
        )

        return {
            "departments": departments,
        }