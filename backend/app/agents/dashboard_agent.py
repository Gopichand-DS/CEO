from sqlalchemy.orm import Session

from app.services.executive_analytics_service import (
    ExecutiveAnalyticsService,
)


class DashboardAgent:

    @staticmethod
    def process(
        db: Session,
        company_id: int,
    ):

        return ExecutiveAnalyticsService.get_executive_dashboard(
            db=db,
            company_id=company_id,
        )