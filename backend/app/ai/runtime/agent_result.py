from pydantic import BaseModel


class AgentResult(BaseModel):

    agent: str

    success: bool

    output: dict | list | str

    execution_time: float = 0.0