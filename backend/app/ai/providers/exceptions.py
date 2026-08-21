class AIProviderError(Exception):
    """Base exception for all AI provider errors."""


class AIAuthenticationError(AIProviderError):
    """Raised when provider authentication fails."""


class AIRateLimitError(AIProviderError):
    """Raised when provider rate limit is exceeded."""


class AITimeoutError(AIProviderError):
    """Raised when provider request times out."""


class AIServiceUnavailableError(AIProviderError):
    """Raised when provider service is unavailable."""


class AIInvalidRequestError(AIProviderError):
    """Raised when an invalid request is sent to the provider."""