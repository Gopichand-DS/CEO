from sqlalchemy.orm import Session

from app.services.analytics_service import (
    AnalyticsService,
)


class WorkflowAgent:

    @staticmethod
    def process(
        db: Session,
        company_id: int,
    ):

        return AnalyticsService.get_workflow_analytics(
            db=db,
            company_id=company_id,
        )