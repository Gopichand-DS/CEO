from sqlalchemy.orm import Session

from app.ai.executor.executor import (
    Executor,
)

from app.ai.planner.execution_plan import (
    ExecutionPlan,
)


class ExecutorService:

    @staticmethod
    def execute(
        db: Session,
        company_id: int,
        plan: ExecutionPlan,
    ):

        return Executor.execute(
            plan=plan,
            db=db,
            company_id=company_id,
        )