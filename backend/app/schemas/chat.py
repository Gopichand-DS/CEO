from datetime import datetime

from pydantic import BaseModel


# ----------------------------------------
# Conversation
# ----------------------------------------

class ConversationCreate(BaseModel):
    title: str | None = None


class ConversationResponse(BaseModel):
    id: int
    title: str
    company_id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True,
    }


# ----------------------------------------
# Message
# ----------------------------------------

class MessageCreate(BaseModel):
    content: str


class MessageResponse(BaseModel):
    id: int
    role: str
    content: str
    created_at: datetime

    model_config = {
        "from_attributes": True,
    }


# ----------------------------------------
# Chat
# ----------------------------------------

class ChatRequest(BaseModel):
    conversation_id: int | None = None
    message: str


class ChatResponse(BaseModel):
    conversation_id: int
    response: str