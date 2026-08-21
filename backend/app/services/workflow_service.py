from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.workflow_repository import (
    WorkflowRepository,
)

from app.schemas.workflow import (
    WorkflowCreate,
    WorkflowUpdate,
)


class WorkflowService:

    @staticmethod
    def create_workflow(
        db: Session,
        workflow: WorkflowCreate,
        company_id: int,
    ):

        existing_workflow = (
            WorkflowRepository.get_by_workflow_code(
                db=db,
                company_id=company_id,
                workflow_code=workflow.workflow_code,
            )
        )

        if existing_workflow:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Workflow code already exists",
            )

        return WorkflowRepository.create(
            db=db,
            workflow=workflow,
            company_id=company_id,
        )

    @staticmethod
    def get_all_workflows(
        db: Session,
        company_id: int,
    ):

        return WorkflowRepository.get_all(
            db=db,
            company_id=company_id,
        )

    @staticmethod
    def get_workflow_by_id(
        db: Session,
        workflow_id: int,
        company_id: int,
    ):

        db_workflow = (
            WorkflowRepository.get_by_id(
                db=db,
                workflow_id=workflow_id,
                company_id=company_id,
            )
        )

        if not db_workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow not found",
            )

        return db_workflow

    @staticmethod
    def update_workflow(
        db: Session,
        workflow_id: int,
        workflow: WorkflowUpdate,
        company_id: int,
    ):

        db_workflow = (
            WorkflowRepository.get_by_id(
                db=db,
                workflow_id=workflow_id,
                company_id=company_id,
            )
        )

        if not db_workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow not found",
            )

        if workflow.workflow_code:

            existing_workflow = (
                WorkflowRepository.get_by_workflow_code(
                    db=db,
                    company_id=company_id,
                    workflow_code=workflow.workflow_code,
                )
            )

            if (
                existing_workflow
                and existing_workflow.id != workflow_id
            ):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Workflow code already exists",
                )

        return WorkflowRepository.update(
            db=db,
            db_workflow=db_workflow,
            workflow=workflow,
        )

    @staticmethod
    def delete_workflow(
        db: Session,
        workflow_id: int,
        company_id: int,
    ):

        db_workflow = (
            WorkflowRepository.get_by_id(
                db=db,
                workflow_id=workflow_id,
                company_id=company_id,
            )
        )

        if not db_workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow not found",
            )

        WorkflowRepository.delete(
            db=db,
            db_workflow=db_workflow,
        )

        return {
            "message": "Workflow deleted successfully"
        }