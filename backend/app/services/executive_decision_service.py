from app.schemas.decision import ExecutiveDecisionResponse
from app.services.dashboard_service import DashboardService
from app.services.decision_rule_engine import DecisionRuleEngine
from app.services.priority_engine import PriorityEngine
from app.services.executive_reasoning_service import ExecutiveReasoningService
from app.services.decision_investigation_service import DecisionInvestigationService

class ExecutiveDecisionService:

    @staticmethod
    def generate_decisions(db, company_id):

        dashboard = DashboardService.get_summary(
            db=db,
            company_id=company_id,
        )

        context = {
            "db": db,
            "company_id": company_id,
            "dashboard": dashboard,
        }

        decisions = DecisionRuleEngine.evaluate(context=context)
        decisions = PriorityEngine.rank(decisions)
        decisions = [
            DecisionInvestigationService.enrich(
                decision,
                context,
            )
            for decision in decisions
        ]
        

        if any(d.priority == "HIGH" for d in decisions):
            overall = "Needs Immediate Attention"

        elif any(d.priority == "MEDIUM" for d in decisions):
            overall = "Monitor Closely"

        else:
            overall = "Healthy"

        summary = ExecutiveReasoningService.generate_summary(
            decisions=decisions,
            overall_status=overall,
        )

        return ExecutiveDecisionResponse(
            overall_status=overall,
            executive_summary=summary,
            decisions=decisions,
        )