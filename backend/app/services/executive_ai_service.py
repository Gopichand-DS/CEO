from app.services.dashboard_service import DashboardService
from app.services.executive_decision_service import ExecutiveDecisionService

from app.ai.context.context_builder import ContextBuilder
from app.ai.prompts.prompt_builder import PromptBuilder
from app.ai.contracts.llm_request import LLMRequest
from app.ai.llm_service import LLMService

from app.ai.investigation_router import InvestigationRouter
from app.ai.intent import AIIntent


class ExecutiveAIService:

    @staticmethod
    def get_context(
        db,
        company_id: int,
    ) -> dict:

        dashboard = DashboardService.get_summary(
            db=db,
            company_id=company_id,
        )

        decisions = ExecutiveDecisionService.generate_decisions(
            db=db,
            company_id=company_id,
        )

        return {
            "dashboard": dashboard,
            "executive": decisions,
        }

    @staticmethod
    def _generate_ai_response(
        db,
        company_id: int,
        user_id: int,
        question: str,
        intent,
        analyzer_result,
    ):

        context = ContextBuilder.build(
            db=db,
            company_id=company_id,
            user_id=user_id,
            question=question,
            execution_result=analyzer_result,
            plan={
                "type": "investigation",
                "intent": (
                    intent.value
                    if hasattr(intent, "value")
                    else str(intent)
                ),
            },
        )

        prompt = PromptBuilder.build(context)

        request = LLMRequest(
            system_prompt=(
                "You are an Executive AI Advisor. "
                "Use the execution result as the authoritative source "
                "for the answer. Never claim data is unavailable when "
                "it exists in the execution result."
            ),
            user_prompt=prompt,
        )

        llm = LLMService()

        return llm.generate(request)

    @staticmethod
    def chat(
        db,
        company_id: int,
        user_id: int,
        message: str,
    ):

        intent, analyzer_result = InvestigationRouter.investigate(
            db=db,
            company_id=company_id,
            message=message,
        )

        if intent == AIIntent.DECISION:
            return ExecutiveDecisionService.generate_decisions(
                db=db,
                company_id=company_id,
            )

        return ExecutiveAIService._generate_ai_response(
            db=db,
            company_id=company_id,
            user_id=user_id,
            question=message,
            intent=intent,
            analyzer_result=analyzer_result,
        )