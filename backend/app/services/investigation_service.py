from sqlalchemy.orm import Session

from app.investigations.analyzer import (
    InvestigationAnalyzer,
)
from app.investigations.intent_classifier import (
    InvestigationIntent,
)
from app.investigations.repository import (
    InvestigationRepository,
)
from app.investigations.context_builder import (
    ContextBuilder,
)
from app.investigations.recommendation_engine import (
    RecommendationEngine,
)

from app.schemas.investigation import (
    InvestigationResponse,
)
from app.ai import intent
from app.ai.intent_classifier import IntentClassifier
from app.investigations.root_cause_engine import RootCauseEngine


class InvestigationService:

    @staticmethod
    def investigate(
        db: Session,
        company_id: int,
        question: str,
    ) -> InvestigationResponse:

        intent = IntentClassifier.classify(question)

        if intent == InvestigationIntent.PROJECT:

            if metrics["projects"].completion_rate < 60:
                findings.append(...)

            if metrics["projects"].high_risk_projects > 0:
                findings.append(...)

        if intent == InvestigationIntent.TASK:

            if metrics["tasks"].overdue_percentage > 25:
                findings.append(...)

            if metrics["tasks"].blocked_tasks > 5:
                findings.append(...)

        if intent == InvestigationIntent.EMPLOYEE:

            if metrics["employees"].employee_utilization < 75:
                findings.append(...)

        if intent == InvestigationIntent.FINANCE:

            executive = metrics["executive"]

            if executive.kpis.profit <= 0:
                findings.append(...)

        intent = IntentClassifier.classify(
            question,
        )
        metrics = InvestigationRepository.collect_company_metrics(
            db=db,
            company_id=company_id,
        )
        
        findings = InvestigationAnalyzer.analyze(
            metrics, intent,
        )

        recommendations = RecommendationEngine.generate(
            findings,
        )

        context = ContextBuilder.build(
            db=db,
            company_id=company_id,
            question=question,
        )

        findings = InvestigationAnalyzer.analyze(context)

        root_causes = RootCauseEngine.analyze(context)
 
        recommendations = RecommendationEngine.generate(findings)

        summary = (
            f"Investigation completed with "
            f"{len(findings)} finding(s)."
        )

        return InvestigationResponse(
            summary=summary,
            findings=findings,
            root_causes=root_causes,
            recommendations=recommendations,
        )