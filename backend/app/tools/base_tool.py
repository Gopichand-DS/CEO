from abc import ABC, abstractmethod


class BaseTool(ABC):

    name: str

    description: str

    @abstractmethod
    def execute(
        self,
        db,
        company_id: int,
        **kwargs,
    ):
        pass