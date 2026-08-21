from datetime import datetime

from pydantic import BaseModel

from app.schemas.decision import ExecutiveDecisionResponse
from app.schemas.executive_analytics import ExecutiveAnalytics


class ExecutiveReport(BaseModel):
    company_id: int
    generated_at: datetime

    executive_summary: str

    analytics: ExecutiveAnalytics

    decisions: ExecutiveDecisionResponse