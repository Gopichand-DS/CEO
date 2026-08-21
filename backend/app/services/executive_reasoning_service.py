from app.schemas.decision import ExecutiveDecision


class ExecutiveReasoningService:

    @staticmethod
    def generate_summary(
        decisions: list[ExecutiveDecision],
        overall_status: str,
    ) -> str:

        if not decisions:
            return "Business operations are healthy."

        if overall_status == "Needs Immediate Attention":
            return (
                "Critical business issues require immediate executive attention. "
                "Review high-priority items first."
            )

        if overall_status == "Monitor Closely":
            return (
                "Business operations are stable, but several areas require monitoring."
            )

        return (
            "Business operations are healthy and progressing as expected."
        )