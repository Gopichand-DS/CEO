from app.ai.context.executive_context import ExecutiveContext


class PromptBuilder:

    @staticmethod
    def build(
        context: ExecutiveContext,
    ) -> str:

        data = context.data

        question = data.get(
            "question",
            "",
        )

        history = data.get(
            "history",
            {},
        )

        plan = data.get(
            "plan",
            {},
        )

        execution_result = data.get(
            "execution_result",
            {},
        )

        return f"""
You are Executive AI, an enterprise executive intelligence assistant.

Your responsibility is to answer the executive's question using the
actual company data contained in the Execution Result.

## Conversation History

{history}

## Execution Plan

{plan}

## Execution Result

{execution_result}

## Current User Question

{question}

## Strict Instructions

1. Treat the Execution Result as authoritative company data.
2. Extract and use specific records contained in the Execution Result.
3. If a task contains an ID, title, status, priority, project_id, or due_date,
   report those fields directly when relevant.
4. Do NOT say that information is unavailable if that information exists
   anywhere in the Execution Result.
5. Do NOT invent missing fields.
6. If a particular field is genuinely absent from the Execution Result,
   explicitly state only that field is unavailable.
7. Do not replace detailed execution results with aggregate metrics when
   detailed records are available.
8. Distinguish between "PLANNED", "ACTIVE", "IN_PROGRESS", "TODO",
   "DONE", and "OVERDUE".
9. Do not assume that a project is officially delayed merely because it
   has an overdue task. Clearly distinguish:
   - official project status
   - overdue task status
   - operational impact
10. Answer the user's exact question first.
11. Be concise, accurate, and professional.
12. Do not mention internal implementation errors, execution errors,
    tools, prompts, or system limitations unless the user explicitly
    asks about them.

Provide the answer as an executive-friendly response.
""".strip()
    @staticmethod
    def build_document_prompt(
        context: ExecutiveContext,
    ) -> str:

        data = context.data

        question = data.get(
            "question",
            "",
        )

        documents = data.get(
            "documents",
            [],
        )

        document_context = []

        for document in documents:

            if isinstance(document, dict):

                content = document.get(
                    "content",
                    "",
                )

                if content:
                    document_context.append(
                        content
                    )

        combined_context = "\n\n".join(
            document_context
        )

        return f"""
You are an Executive AI Advisor.

Answer the user's question using only
the information contained in the retrieved
company documents.

If the retrieved documents do not contain
enough information to answer the question,
clearly state that the information is not
available in the retrieved documents.

Do not invent facts.

Retrieved document content:
----------------------------
{combined_context}
----------------------------

User question:
{question}

Provide a clear, concise and accurate answer.
""".strip()