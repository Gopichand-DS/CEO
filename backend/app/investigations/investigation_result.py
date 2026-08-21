from dataclasses import dataclass, field


@dataclass
class InvestigationResult:
    investigation_type: str
    summary: str
    findings: list[str] = field(default_factory=list)
    recommendations: list[str] = field(default_factory=list)
    confidence: float = 0.0