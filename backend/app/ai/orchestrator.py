from sqlalchemy.orm import Session

from app.ai.planner.planner_service import (
    PlannerService,
)

from app.ai.executor.executor_service import (
    ExecutorService,
)

from app.ai.context.context_builder import (
    ContextBuilder,
)

from app.ai.prompts.prompt_builder import (
    PromptBuilder,
)

from app.ai.contracts.llm_request import (
    LLMRequest,
)

from app.ai.llm_service import (
    LLMService,
)

from app.memory.memory_manager import (
    MemoryManager,
)


class AIOrchestrator:

    @staticmethod
    def execute(
        db: Session,
        company_id: int,
        user_id: int,
        question: str,
    ):

        # -------------------------
        # Save User Question
        # -------------------------

        MemoryManager.remember_user(
            db=db,
            company_id=company_id,
            user_id=user_id,
            message=question,
        )

        # -------------------------
        # Build Execution Plan
        # -------------------------

        plan = PlannerService.create_plan(
            db=db,
            company_id=company_id,
            question=question,
        )

        # -------------------------
        # Execute Plan
        # -------------------------

        execution = ExecutorService.execute(
            db=db,
            company_id=company_id,
            plan=plan,
        )

        # -------------------------
        # Build Context
        # -------------------------

        context = ContextBuilder.build(
            db=db,
            company_id=company_id,
            user_id=user_id,
            question=question,
            execution_result=execution,
            plan=plan,
        )

        # -------------------------
        # Build Prompt
        # -------------------------

        prompt = PromptBuilder.build(
            context,
        )

        # -------------------------
        # Gemini
        # -------------------------

        request = LLMRequest(
            system_prompt="You are an Executive AI Advisor.",
            user_prompt=prompt,
        )

        llm = LLMService()

        response = llm.generate(
            request,
        )

        # -------------------------
        # Save Response
        # -------------------------

        MemoryManager.remember_ai(
            db=db,
            company_id=company_id,
            user_id=user_id,
            message=response.content,
        )

        return response