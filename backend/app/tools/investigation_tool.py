from app.tools.base_tool import BaseTool
from app.ai.investigation_router import InvestigationRouter


class InvestigationTool(BaseTool):

    name = "investigation"

    description = "Investigates company business questions."

    def execute(
        self,
        db,
        company_id: int,
        question: str = "",
        **kwargs,
    ):

        if not question:
            raise ValueError(
                "Investigation question is required."
            )

        intent, result = InvestigationRouter.investigate(
            db=db,
            company_id=company_id,
            message=question,
        )

        return {
            "intent": intent.value,
            "result": result,
        }