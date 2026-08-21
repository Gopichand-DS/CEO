from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class ExecutiveContext(BaseModel):

    model_config = ConfigDict(
        extra="forbid",
    )

    company_id: int

    intent: str

    data: dict[str, Any] = Field(default_factory=dict)

    conversation_history: list = Field(default_factory=list)

    tool_result: Any | None = None

    investigation: dict[str, Any] = Field(
        default_factory=dict,
    )

    memory: str = ""

    documents: list[str] = Field(
        default_factory=list,
    )

    dashboard: dict[str, Any] = Field(
        default_factory=dict,
    )

    executive: dict[str, Any] = Field(
        default_factory=dict,
    )