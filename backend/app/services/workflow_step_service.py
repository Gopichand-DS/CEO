from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.workflow_repository import WorkflowRepository
from app.repositories.workflow_step_repository import WorkflowStepRepository
from app.schemas.workflow_step import (
    WorkflowStepCreate,
    WorkflowStepUpdate,
)


class WorkflowStepService:

    @staticmethod
    def create_workflow_step(
        db: Session,
        workflow_step: WorkflowStepCreate,
        company_id: int,
    ):
        workflow = WorkflowRepository.get_by_id(
            db=db,
            workflow_id=workflow_step.workflow_id,
            company_id=company_id,
        )

        if not workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow not found",
            )

        existing_step = (
            WorkflowStepRepository.get_by_workflow_and_order(
                db=db,
                workflow_id=workflow_step.workflow_id,
                company_id=company_id,
                step_order=workflow_step.step_order,
            )
        )

        if existing_step:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Step order already exists in this workflow",
            )

        return WorkflowStepRepository.create(
            db=db,
            workflow_step=workflow_step,
        )

    @staticmethod
    def get_all_workflow_steps(
        db: Session,
        company_id: int,
    ):
        return WorkflowStepRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

    @staticmethod
    def get_workflow_step_by_id(
        db: Session,
        workflow_step_id: int,
        company_id: int,
    ):
        db_workflow_step = WorkflowStepRepository.get_by_id(
            db=db,
            workflow_step_id=workflow_step_id,
            company_id=company_id,
        )

        if not db_workflow_step:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow step not found",
            )

        return db_workflow_step

    @staticmethod
    def get_steps_by_workflow(
        db: Session,
        workflow_id: int,
        company_id: int,
    ):
        workflow = WorkflowRepository.get_by_id(
            db=db,
            workflow_id=workflow_id,
            company_id=company_id,
        )

        if not workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow not found",
            )

        return WorkflowStepRepository.get_by_workflow(
            db=db,
            workflow_id=workflow_id,
            company_id=company_id,
        )

    @staticmethod
    def update_workflow_step(
        db: Session,
        workflow_step_id: int,
        workflow_step: WorkflowStepUpdate,
        company_id: int,
    ):
        db_workflow_step = WorkflowStepRepository.get_by_id(
            db=db,
            workflow_step_id=workflow_step_id,
            company_id=company_id,
        )

        if not db_workflow_step:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow step not found",
            )

        workflow_id = (
            workflow_step.workflow_id
            if workflow_step.workflow_id is not None
            else db_workflow_step.workflow_id
        )

        # Prevent moving a step to a workflow owned by another company.
        workflow = WorkflowRepository.get_by_id(
            db=db,
            workflow_id=workflow_id,
            company_id=company_id,
        )

        if not workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow not found",
            )

        step_order = (
            workflow_step.step_order
            if workflow_step.step_order is not None
            else db_workflow_step.step_order
        )

        existing_step = (
            WorkflowStepRepository.get_by_workflow_and_order(
                db=db,
                workflow_id=workflow_id,
                company_id=company_id,
                step_order=step_order,
            )
        )

        if (
            existing_step
            and existing_step.id != workflow_step_id
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Step order already exists in this workflow",
            )

        return WorkflowStepRepository.update(
            db=db,
            db_workflow_step=db_workflow_step,
            workflow_step=workflow_step,
        )

    @staticmethod
    def delete_workflow_step(
        db: Session,
        workflow_step_id: int,
        company_id: int,
    ):
        db_workflow_step = WorkflowStepRepository.get_by_id(
            db=db,
            workflow_step_id=workflow_step_id,
            company_id=company_id,
        )

        if not db_workflow_step:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow step not found",
            )

        WorkflowStepRepository.delete(
            db=db,
            db_workflow_step=db_workflow_step,
        )

        return {
            "message": "Workflow step deleted successfully"
        }