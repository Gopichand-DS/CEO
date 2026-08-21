from app.ai.sub_intent import AISubIntent
from app.analyzers.project_analyzer import ProjectAnalyzer
from app.schemas.decision import ExecutiveDecision


class DecisionInvestigationService:

    @staticmethod
    def enrich(
        decision: ExecutiveDecision,
        context: dict,
    ) -> ExecutiveDecision:

        db = context["db"]
        company_id = context["company_id"]

        if decision.title == "Project Progress":

            result = ProjectAnalyzer.project_delay(
                db=db,
                company_id=company_id,
                question="Executive decision investigation",
            )

            # ProjectAnalyzer currently returns a dictionary.
            decision.findings = result.get(
                "findings",
                [],
            )

            decision.recommendations = result.get(
                "recommendations",
                [],
            )

            # Current ProjectAnalyzer result does not provide
            # a confidence value, so use a safe default.
            decision.confidence = result.get(
                "confidence",
                0.90,
            )

        return decision