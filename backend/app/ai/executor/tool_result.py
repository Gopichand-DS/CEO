from pydantic import BaseModel


class ToolResult(BaseModel):

    tool: str

    success: bool

    data: dict | list | str

    error: str | None = None