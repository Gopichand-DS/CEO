from app.investigations.investigation_context import (
    InvestigationContext,
)
from app.services.investigation_service import (
    InvestigationService,
)
from app.investigations.investigation_types import InvestigationType


class InvestigationAdapter:

    @staticmethod
    def investigate_project_delay(project_analytics):

        context = InvestigationContext(
            investigation_type=InvestigationType.PROJECT_DELAY,
            project_analytics=project_analytics,
        )

        return InvestigationService.investigate(context)