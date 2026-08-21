from pydantic import BaseModel

from app.ai.executor.tool_result import (
    ToolResult,
)


class ExecutionResult(BaseModel):

    results: list[ToolResult]

    success: bool