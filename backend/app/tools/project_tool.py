from sqlalchemy.orm import Session

from app.tools.base_tool import BaseTool
from app.repositories.project_repository import (
    ProjectRepository,
)


class ProjectTool(BaseTool):

    @property
    def tool_name(self):
        return "project_tool"

    def execute(
        self,
        db: Session,
        company_id: int,
        **kwargs,
    ):

        return {
            "analytics":
                ProjectRepository.get_project_analytics(
                    db=db,
                    company_id=company_id,
                ),

            "projects":
                ProjectRepository.get_all_by_company(
                    db=db,
                    company_id=company_id,
                ),
        }