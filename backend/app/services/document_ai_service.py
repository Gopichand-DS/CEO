from sqlalchemy.orm import Session

from app.rag.retrieval.retriever import Retriever

from app.ai.context.context_builder import ContextBuilder

from app.ai.prompts.prompt_builder import PromptBuilder

from app.ai.contracts.llm_request import LLMRequest

from app.ai.llm_service import LLMService


class DocumentAIService:

    @staticmethod
    def ask_document(
        db: Session,
        company_id: int,
        user_id: int,
        question: str,
    ):

        documents = Retriever.retrieve(
            question=question,
            company_id=company_id,
        )

        context = ContextBuilder.build_document_context(
            db=db,
            company_id=company_id,
            user_id=user_id,
            question=question,
            documents=documents,
        )

        prompt = PromptBuilder.build_document_prompt(
            context,
        )

        llm = LLMService()

        return llm.generate(

            LLMRequest(

                system_prompt=(
                    "You are an enterprise "
                    "document assistant."
                ),

                user_prompt=prompt,

            )

        )