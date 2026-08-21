from abc import ABC, abstractmethod
from sqlalchemy.orm import Session


class BaseAgent(ABC):

    @abstractmethod
    def execute(
        self,
        db: Session,
        company_id: int,
        message: str,
    ) -> dict:
        """
        Returns structured context
        that will be given to the LLM.
        """
        pass