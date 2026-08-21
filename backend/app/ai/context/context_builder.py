from typing import Any

from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.memory.memory_manager import MemoryManager
from app.ai.context.executive_context import ExecutiveContext


class ContextBuilder:

    @staticmethod
    def build(
        db: Session,
        company_id: int,
        user_id: int,
        question: str,
        execution_result: Any,
        plan: Any,
    ) -> ExecutiveContext:

        history = MemoryManager.conversation_history(
            db=db,
            company_id=company_id,
            user_id=user_id,
        )

        if isinstance(execution_result, BaseModel):
            execution_result = execution_result.model_dump()

        elif not isinstance(execution_result, dict):
            execution_result = vars(execution_result)

        if isinstance(plan, BaseModel):
            plan = plan.model_dump()

        elif not isinstance(plan, dict):
            plan = vars(plan)

        if isinstance(history, BaseModel):
            history = history.model_dump()

        elif not isinstance(history, (dict, list)):
            history = vars(history)

        return ExecutiveContext(
            company_id=company_id,
            intent="executive",
            data={
                "user_id": user_id,
                "question": question,
                "history": history,
                "plan": plan,
                "execution_result": execution_result,
            },
        )

    @staticmethod
    def build_document_context(
        db: Session,
        company_id: int,
        user_id: int,
        question: str,
        documents: list[Any],
    ) -> ExecutiveContext:

        normalized_documents = []

        for document in documents:

            if isinstance(document, BaseModel):
                document = document.model_dump()

            elif not isinstance(document, dict):
                document = vars(document)

            normalized_documents.append(document)

        return ExecutiveContext(
            company_id=company_id,
            intent="document_question",
            data={
                "question": question,
                "documents": normalized_documents,
                "user_id": user_id,
            },
        )