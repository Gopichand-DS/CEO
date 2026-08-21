from app.ai.executor.execution_result import (
    ExecutionResult,
)

from app.ai.executor.tool_result import (
    ToolResult,
)

from app.tools.tool_registry import (
    ToolRegistry,
)


class Executor:

    @staticmethod
    def execute(
        plan,
        db,
        company_id: int,
    ) -> ExecutionResult:

        results = []

        success = True

        for step in plan.steps:

            try:

                data = ToolRegistry.execute(
                    tool_name=step.tool,
                    db=db,
                    company_id=company_id,
                    **step.parameters,
                )

                results.append(

                    ToolResult(

                        tool=step.tool,

                        success=True,

                        data=data,

                    )

                )

            except Exception as ex:

                success = False

                results.append(

                    ToolResult(

                        tool=step.tool,

                        success=False,

                        data={},

                        error=str(ex),

                    )

                )

        return ExecutionResult(

            results=results,

            success=success,

        )