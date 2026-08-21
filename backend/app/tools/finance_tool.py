from app.tools.base_tool import BaseTool

from app.repositories.finance_repository import (
    FinanceRepository,
)


class FinanceTool(BaseTool):

    name = "finance"

    description = "Financial KPIs"

    def execute(
        self,
        db,
        company_id: int,
        **kwargs,
    ):

        return FinanceRepository.get_financial_summary(
            db=db,
            company_id=company_id,
        )