from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class LLMRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    system_prompt: str = Field(..., min_length=1)
    user_prompt: str = Field(..., min_length=1)

    temperature: float = Field(default=0.3, ge=0.0, le=2.0)
    max_tokens: int = Field(default=2000, gt=0)

    metadata: dict[str, Any] = Field(default_factory=dict)