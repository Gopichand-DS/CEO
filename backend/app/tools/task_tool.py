from sqlalchemy.orm import Session

from app.tools.base_tool import BaseTool
from app.repositories.task_repository import (
    TaskRepository,
)


class TaskTool(BaseTool):

    @property
    def tool_name(self):
        return "task_tool"

    def execute(
        self,
        db: Session,
        company_id: int,
        **kwargs,
    ):

        return TaskRepository.get_company_task_summary(
            db=db,
            company_id=company_id,
        )