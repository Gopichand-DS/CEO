from app.investigations.investigation_result import InvestigationResult


class BusinessIntelligenceEngine:

    @staticmethod
    def build_response(
        result: InvestigationResult,
    ):

        return {
            "summary": result.summary,
            "findings": result.findings,
            "recommendations": result.recommendations,
            "confidence": result.confidence,
            "status": "SUCCESS",
        }