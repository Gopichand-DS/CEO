from sqlalchemy.orm import Session

from app.services.dashboard_service import DashboardService


class DashboardInvestigation:

    @staticmethod
    def investigate(
        db: Session,
        company_id: int,
    ):
        """
        Collect dashboard information required for AI analysis.
        """

        dashboard = DashboardService.get_summary(
            db=db,
            company_id=company_id,
        )

        return dashboard