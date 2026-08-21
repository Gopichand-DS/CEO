from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.schemas.report import ExecutiveReport

from app.services.executive_analytics_service import (
    ExecutiveAnalyticsService,
)

from app.services.executive_decision_service import (
    ExecutiveDecisionService,
)


class ReportService:

    @staticmethod
    def generate_executive_report(
        db: Session,
        company_id: int,
    ) -> ExecutiveReport:

        analytics = (
            ExecutiveAnalyticsService.get_executive_dashboard(
                db=db,
                company_id=company_id,
            )
        )

        decisions = (
            ExecutiveDecisionService.generate_decisions(
                db=db,
                company_id=company_id,
            )
        )

        executive_summary = (
            f"Executive report generated successfully. "
            f"Company health score: "
            f"{analytics.kpis.company_health}%."
        )

        return ExecutiveReport(
            company_id=company_id,
            generated_at=datetime.now(timezone.utc),
            executive_summary=executive_summary,
            analytics=analytics,
            decisions=decisions,
        )