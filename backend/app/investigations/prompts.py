class PromptBuilder:

    @staticmethod
    def build(context, findings, root_causes):

        return f"""
Question:
{context.question}

Intent:
{context.intent}

Findings:
{findings}

Root Causes:
{root_causes}

Provide an executive summary,
business impact,
and recommendations.
"""