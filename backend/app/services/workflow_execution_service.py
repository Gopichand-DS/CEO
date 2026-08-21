from datetime import datetime, timezone

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.workflow_execution_repository import (
    WorkflowExecutionRepository,
)

from app.events.publisher import EventPublisher
from app.events.event import Event
from app.events.event_types import EventType


class WorkflowExecutionService:

    @staticmethod
    def advance_to_next_step(
        db: Session,
        instance_id: int,
        company_id: int,
    ):
        workflow_instance = (
            WorkflowExecutionRepository.get_instance(
                db=db,
                instance_id=instance_id,
                company_id=company_id,
            )
        )

        if not workflow_instance:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow instance not found",
            )

        if workflow_instance.status == "Completed":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Workflow already completed",
            )

        next_step = (
            WorkflowExecutionRepository.get_next_step(
                db=db,
                workflow_id=workflow_instance.workflow_id,
                company_id=company_id,
                current_step=workflow_instance.current_step,
            )
        )

        if not next_step:
            workflow_instance.status = "Completed"

            return WorkflowExecutionRepository.save(
                db=db,
                workflow_instance=workflow_instance,
            )

        workflow_instance.current_step = next_step.step_order
        workflow_instance.status = "In Progress"

        EventPublisher.publish(
            Event(
                event_type=EventType.WORKFLOW_ADVANCED,
                payload={
                    "workflow_instance_id": workflow_instance.id,
                    "workflow_id": workflow_instance.workflow_id,
                    "employee_id": workflow_instance.employee_id,
                    "current_step": workflow_instance.current_step,
                },
                occurred_at=datetime.now(timezone.utc),
            )
        )

        return WorkflowExecutionRepository.save(
            db=db,
            workflow_instance=workflow_instance,
        )

    @staticmethod
    def pause_workflow(
        db: Session,
        instance_id: int,
        company_id: int,
    ):
        workflow_instance = (
            WorkflowExecutionRepository.get_instance(
                db=db,
                instance_id=instance_id,
                company_id=company_id,
            )
        )

        if not workflow_instance:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow instance not found",
            )

        if workflow_instance.status == "Completed":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Completed workflow cannot be paused",
            )

        if workflow_instance.status == "Cancelled":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cancelled workflow cannot be paused",
            )

        workflow_instance.status = "Paused"

        return WorkflowExecutionRepository.save(
            db=db,
            workflow_instance=workflow_instance,
        )

    @staticmethod
    def resume_workflow(
        db: Session,
        instance_id: int,
        company_id: int,
    ):
        workflow_instance = (
            WorkflowExecutionRepository.get_instance(
                db=db,
                instance_id=instance_id,
                company_id=company_id,
            )
        )

        if not workflow_instance:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow instance not found",
            )

        if workflow_instance.status == "Completed":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Completed workflow cannot be resumed",
            )

        if workflow_instance.status == "Cancelled":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cancelled workflow cannot be resumed",
            )

        workflow_instance.status = "In Progress"

        return WorkflowExecutionRepository.save(
            db=db,
            workflow_instance=workflow_instance,
        )

    @staticmethod
    def cancel_workflow(
        db: Session,
        instance_id: int,
        company_id: int,
    ):
        workflow_instance = (
            WorkflowExecutionRepository.get_instance(
                db=db,
                instance_id=instance_id,
                company_id=company_id,
            )
        )

        if not workflow_instance:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow instance not found",
            )

        if workflow_instance.status == "Completed":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Completed workflow cannot be cancelled",
            )

        if workflow_instance.status == "Cancelled":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Workflow already cancelled",
            )

        workflow_instance.status = "Cancelled"

        return WorkflowExecutionRepository.save(
            db=db,
            workflow_instance=workflow_instance,
        )