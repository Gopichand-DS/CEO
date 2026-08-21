from app.schemas.investigation import (
    InvestigationFinding,
    InvestigationRecommendation,
)


class RecommendationEngine:

    @staticmethod
    def generate(
        findings: list[InvestigationFinding],
    ) -> list[InvestigationRecommendation]:

        recommendations = []

        for finding in findings:

            if finding.title == "High Task Overdue Rate":

                recommendations.append(
                    InvestigationRecommendation(
                        priority="HIGH",
                        recommendation=(
                            "Review overdue tasks immediately and assign additional resources to critical work items."
                        ),
                    )
                )

            elif finding.title == "Low Project Completion":

                recommendations.append(
                    InvestigationRecommendation(
                        priority="HIGH",
                        recommendation=(
                            "Review delayed projects, identify blockers, and conduct a project status meeting."
                        ),
                    )
                )

            elif finding.title == "Low Employee Utilization":

                recommendations.append(
                    InvestigationRecommendation(
                        priority="MEDIUM",
                        recommendation=(
                            "Evaluate employee workload distribution and rebalance assignments."
                        ),
                    )
                )

        return recommendations