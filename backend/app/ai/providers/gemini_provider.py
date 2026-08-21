import time

from google import genai

from app.ai.contracts.llm_request import LLMRequest
from app.ai.contracts.llm_response import LLMResponse
from app.ai.contracts.provider_info import ProviderInfo
from app.ai.contracts.token_usage import TokenUsage
from app.ai.providers.base_provider import BaseProvider
from app.ai.providers.exceptions import AIProviderError
from app.core.config import settings


class GeminiProvider(BaseProvider):

    def __init__(self):
        self.client = genai.Client(
            api_key=settings.gemini_api_key
        )

    @property
    def provider_name(self) -> str:
        return "Gemini"

    @property
    def model_name(self) -> str:
        return settings.gemini_model

    def generate(self, request: LLMRequest) -> LLMResponse:
        start = time.perf_counter()

        try:

            prompt = f"""
System Instructions:
{request.system_prompt}

User Request:
{request.user_prompt}
"""

            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
            )

            latency = int((time.perf_counter() - start) * 1000)

            usage_metadata = getattr(response, "usage_metadata", None)

            if usage_metadata:
                usage = TokenUsage(
                    prompt_tokens=getattr(usage_metadata, "prompt_token_count", 0),
                    completion_tokens=getattr(
                        usage_metadata,
                        "candidates_token_count",
                        0,
                    ),
                    total_tokens=getattr(
                        usage_metadata,
                        "total_token_count",
                        0,
                    ),
                )
            else:
                usage = TokenUsage()

            provider = ProviderInfo(
                provider=self.provider_name,
                model=self.model_name,
            )

            return LLMResponse(
                content=response.text,
                provider=provider,
                usage=usage,
                finish_reason="completed",
                latency_ms=latency,
                success=True,
            )

        except Exception as exc:
            raise AIProviderError(str(exc)) from exc

    def health_check(self) -> bool:
        try:
            self.client.models.generate_content(
                model=self.model_name,
                contents="ping",
            )
            return True

        except Exception:
            return False