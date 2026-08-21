from sqlalchemy.orm import Session

from app.agents.base_agent import BaseAgent


class GeneralAgent(BaseAgent):

    def execute(
        self,
        db: Session,
        company_id: int,
        message: str,
    ):

        return {
            "message": message,
        }