from pydantic import BaseModel, ConfigDict

from app.ai.contracts.provider_info import ProviderInfo
from app.ai.contracts.token_usage import TokenUsage


class LLMResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    content: str
    provider: ProviderInfo
    usage: TokenUsage

    finish_reason: str
    latency_ms: int

    success: bool = True