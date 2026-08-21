from datetime import datetime

from pydantic import BaseModel, ConfigDict


class DocumentResponse(BaseModel):

    id: int

    name: str

    file_name: str

    file_type: str

    file_size: int

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )