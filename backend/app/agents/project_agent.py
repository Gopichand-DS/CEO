from sqlalchemy.orm import Session

from app.agents.base_agent import BaseAgent
from app.repositories.project_repository import ProjectRepository


class ProjectAgent(BaseAgent):

    def execute(
        self,
        db: Session,
        company_id: int,
        message: str,
    ):

        analytics = ProjectRepository.get_project_analytics(
            db=db,
            company_id=company_id,
        )

        projects = ProjectRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        return {
            "analytics": analytics,
            "projects": projects,
        }