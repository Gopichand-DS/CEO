from app.schemas.investigation import (
    InvestigationFinding,
)


class InvestigationAnalyzer:

    @staticmethod
    def analyze(metrics):

        findings = []

        if metrics["tasks"].overdue_percentage > 25:

            findings.append(
                InvestigationFinding(
                    title="High Task Overdue Rate",
                    description=(
                        "More than 25% of company tasks are overdue."
                    ),
                    severity="HIGH",
                )
            )

        if metrics["projects"].completion_rate < 60:

            findings.append(
                InvestigationFinding(
                    title="Low Project Completion",
                    description=(
                        "Project completion rate is below the target."
                    ),
                    severity="HIGH",
                )
            )

        if metrics["employees"].employee_utilization < 75:

            findings.append(
                InvestigationFinding(
                    title="Low Employee Utilization",
                    description=(
                        "Employee utilization is below acceptable levels."
                    ),
                    severity="MEDIUM",
                )
            )

        return findings