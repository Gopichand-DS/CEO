from datetime import datetime

from pydantic import BaseModel


class AuditResponse(BaseModel):

    id: int

    module: str

    action: str

    entity_id: int | None

    description: str

    created_at: datetime

    model_config = {
        "from_attributes": True,
    }