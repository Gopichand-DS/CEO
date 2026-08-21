from app.tools.base_tool import BaseTool
from app.services.dashboard_service import DashboardService


class DashboardTool(BaseTool):

    name = "dashboard"

    description = "Returns executive dashboard."

    def execute(
        self,
        db,
        company_id: int,
        **kwargs,
    ):

        return DashboardService.get_summary(
            db=db,
            company_id=company_id,
        )