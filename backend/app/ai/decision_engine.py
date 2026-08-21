from app.investigations.investigation_result import InvestigationResult


class DecisionEngine:

    @staticmethod
    def evaluate(
        result: InvestigationResult,
    ):

        priority = "LOW"

        if result.confidence >= 0.90:
            priority = "HIGH"
        elif result.confidence >= 0.70:
            priority = "MEDIUM"

        return {
            "priority": priority,
            "summary": result.summary,
            "findings": result.findings,
            "recommendations": result.recommendations,
            "confidence": result.confidence,
        }