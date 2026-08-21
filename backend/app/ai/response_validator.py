from urllib import request, response

from app.ai.contracts.llm_response import (
    LLMResponse,
)
from backend.app.ai.providers.retry_handler import RetryHandler


class ResponseValidator:

    @staticmethod
    def validate(
        response: LLMResponse,
    ):

        if response is None:
            raise ValueError(
                "LLM returned None."
            )

        if not response.content.strip():
            raise ValueError(
                "Empty LLM response."
            )

        response = RetryHandler.execute(
            lambda: self.provider.generate(request)
        )

        return ResponseValidator.validate(response)
        return response