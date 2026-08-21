from pydantic import BaseModel, ConfigDict
from app.memory.investigation_memory import InvestigationMemory

class ExecutiveMemory(BaseModel):
    model_config = ConfigDict(extra="forbid")

    company_id: int
    memories: list[InvestigationMemory]