from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.workflow_instance import WorkflowInstanceResponse

from app.services.workflow_execution_service import (
    WorkflowExecutionService,
)


router = APIRouter(
    prefix="/workflow-execution",
    tags=["Workflow Execution"],
)


@router.post(
    "/{instance_id}/next",
    response_model=WorkflowInstanceResponse,
)
def advance_to_next_step(
    instance_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowExecutionService.advance_to_next_step(
        db=db,
        instance_id=instance_id,
        company_id=current_user.company_id,
    )


@router.post(
    "/{instance_id}/pause",
    response_model=WorkflowInstanceResponse,
)
def pause_workflow(
    instance_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowExecutionService.pause_workflow(
        db=db,
        instance_id=instance_id,
        company_id=current_user.company_id,
    )


@router.post(
    "/{instance_id}/resume",
    response_model=WorkflowInstanceResponse,
)
def resume_workflow(
    instance_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowExecutionService.resume_workflow(
        db=db,
        instance_id=instance_id,
        company_id=current_user.company_id,
    )


@router.post(
    "/{instance_id}/cancel",
    response_model=WorkflowInstanceResponse,
)
def cancel_workflow(
    instance_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowExecutionService.cancel_workflow(
        db=db,
        instance_id=instance_id,
        company_id=current_user.company_id,
    )