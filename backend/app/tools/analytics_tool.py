from app.tools.base_tool import BaseTool

from app.services.analytics_service import (
    AnalyticsService,
)


class AnalyticsTool(BaseTool):

    name = "analytics"

    description = "Company analytics"

    def execute(
        self,
        db,
        company_id: int,
        **kwargs,
    ):

        return AnalyticsService.get_dashboard_analytics(
            db=db,
            company_id=company_id,
        )