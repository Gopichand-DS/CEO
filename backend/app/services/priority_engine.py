from app.schemas.decision import ExecutiveDecision


class PriorityEngine:

    PRIORITY_SCORE = {
        "HIGH": 3,
        "MEDIUM": 2,
        "LOW": 1,
    }

    @staticmethod
    def rank(
        decisions: list[ExecutiveDecision],
    ) -> list[ExecutiveDecision]:

        return sorted(
            decisions,
            key=lambda decision: (
                PriorityEngine.PRIORITY_SCORE.get(
                    decision.priority,
                    0,
                )
            ),
            reverse=True,
        )