from app.ai.runtime.agent_runtime import (
    AgentRuntime,
)


class RuntimeService:

    @staticmethod
    def execute_plan(
        plan,
        db,
        company_id: int,
    ):

        results = []

        for step in plan.steps:

            results.append(

                AgentRuntime.execute_step(
                    step=step,
                    db=db,
                    company_id=company_id,
                )

            )

        return results