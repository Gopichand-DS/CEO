from app.tools.base_tool import BaseTool

from app.repositories.workflow_repository import (
    WorkflowRepository,
)


class WorkflowTool(BaseTool):

    name = "workflow"

    description = "Workflow information"

    def execute(
        self,
        db,
        company_id: int,
        **kwargs,
    ):

        return WorkflowRepository.get_summary(
            db=db,
            company_id=company_id,
        )