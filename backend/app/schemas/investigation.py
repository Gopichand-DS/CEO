from typing import List

from pydantic import BaseModel, ConfigDict


class InvestigationRequest(BaseModel):
    question: str


class InvestigationFinding(BaseModel):
    title: str
    description: str
    severity: str

    model_config = ConfigDict(from_attributes=True)


class InvestigationRecommendation(BaseModel):
    priority: str
    recommendation: str

    model_config = ConfigDict(from_attributes=True)


class InvestigationResponse(BaseModel):
    summary: str

    findings: List[InvestigationFinding]

    recommendations: List[InvestigationRecommendation]

    model_config = ConfigDict(from_attributes=True)