from pydantic import BaseModel


class AIHealthResponse(BaseModel):
    provider: str
    model: str
    healthy: bool