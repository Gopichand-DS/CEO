from app.services.investigation_service import InvestigationService
from app.ai.business_intelligence_engine import (
    BusinessIntelligenceEngine,
)


class InvestigationOrchestrator:

    @staticmethod
    def execute(context):

        investigation = InvestigationService.investigate(
            context
        )

        return BusinessIntelligenceEngine.build_response(
            investigation
        )