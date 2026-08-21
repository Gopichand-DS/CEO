class RootCauseAnalyzer:

    @staticmethod
    def analyze(
        context,
    ):

        findings = []

        dashboard = context.evidence.get(
            "dashboard_tool",
        )

        if dashboard:

            findings.append(
                "Dashboard metrics collected."
            )

        projects = context.evidence.get(
            "project_tool",
        )

        if projects:

            analytics = projects.get(
                "analytics",
                {},
            )

            delayed = analytics.get(
                "delayed_projects",
                0,
            )

            if delayed > 0:

                findings.append(
                    f"{delayed} delayed projects detected."
                )

        context.findings = findings

        return context