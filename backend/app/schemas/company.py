from pydantic import BaseModel, ConfigDict


class CompanyCreate(BaseModel):
    name: str
    industry: str | None = None
    country: str | None = None


class CompanyResponse(BaseModel):
    id: int
    name: str
    industry: str | None = None
    country: str | None = None

    model_config = ConfigDict(from_attributes=True)