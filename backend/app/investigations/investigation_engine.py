from app.investigations.investigation_context import InvestigationContext
from app.investigations.investigation_result import InvestigationResult
from app.investigations.investigation_types import InvestigationType
from app.investigations.investigation_prompts import INVESTIGATION_PROMPTS


class InvestigationEngine:

    @staticmethod
    def investigate(context: InvestigationContext):

        if context.investigation_type == InvestigationType.PROJECT_DELAY:
            return InvestigationEngine._project_delay(context)

        if context.investigation_type == InvestigationType.PROJECT_RISK:
            return InvestigationEngine._project_risk(context)

        return InvestigationResult(
            investigation_type=context.investigation_type,
            summary="Investigation type not implemented.",
            findings=[],
            recommendations=[],
            confidence=0.0,
        )