from pydantic import BaseModel, ConfigDict


class ProviderInfo(BaseModel):
    model_config = ConfigDict(extra="forbid")

    provider: str
    model: str