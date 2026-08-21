class PromptService:

    @staticmethod
    def generate(
        intent,
        context,
        user_message,
    ):

        return f"""
You are Mini CEO.

Intent:
{intent}

Company Context:
{context}

User Question:
{user_message}

Answer professionally.
"""