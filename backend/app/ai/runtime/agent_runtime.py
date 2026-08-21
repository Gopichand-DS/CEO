import time

from app.ai.executor.tool_result import ToolResult

from app.tools.tool_registry import (
    ToolRegistry,
)

from app.ai.runtime.agent_result import (
    AgentResult,
)


class AgentRuntime:

    @staticmethod
    def execute_step(
        step,
        db,
        company_id: int,
    ) -> AgentResult:

        start = time.perf_counter()

        result = ToolRegistry.execute(
            tool_name=step.tool,
            db=db,
            company_id=company_id,
            **step.parameters,
        )

        end = time.perf_counter()

        return AgentResult(
            agent=step.tool,
            success=True,
            output=result,
            execution_time=end - start,
        )