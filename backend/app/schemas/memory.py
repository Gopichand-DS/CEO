from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ConversationMemoryResponse(BaseModel):

    id: int

    role: str

    message: str

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )


class ConversationHistoryResponse(BaseModel):

    messages: list[ConversationMemoryResponse]

    model_config = ConfigDict(
        from_attributes=True,
    )