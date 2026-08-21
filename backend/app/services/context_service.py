from sqlalchemy.orm import Session

from app.services.dashboard_service import DashboardService


class ContextService:

    @staticmethod
    def build(
        db: Session,
        company_id: int,
        intent,
    ):

        dashboard = DashboardService.get_summary(
            db=db,
            company_id=company_id,
        )

        return {
            "dashboard": dashboard,
        }