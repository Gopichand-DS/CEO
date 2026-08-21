from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.workflow_step import (
    WorkflowStepCreate,
    WorkflowStepResponse,
    WorkflowStepUpdate,
)

from app.services.workflow_step_service import WorkflowStepService


router = APIRouter(
    prefix="/workflow-steps",
    tags=["Workflow Steps"],
)


@router.post(
    "/",
    response_model=WorkflowStepResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_workflow_step(
    workflow_step: WorkflowStepCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowStepService.create_workflow_step(
        db=db,
        workflow_step=workflow_step,
        company_id=current_user.company_id,
    )


@router.get(
    "/",
    response_model=List[WorkflowStepResponse],
)
def get_all_workflow_steps(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowStepService.get_all_workflow_steps(
        db=db,
        company_id=current_user.company_id,
    )


@router.get(
    "/{workflow_step_id}",
    response_model=WorkflowStepResponse,
)
def get_workflow_step_by_id(
    workflow_step_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowStepService.get_workflow_step_by_id(
        db=db,
        workflow_step_id=workflow_step_id,
        company_id=current_user.company_id,
    )


@router.get(
    "/workflow/{workflow_id}",
    response_model=List[WorkflowStepResponse],
)
def get_steps_by_workflow(
    workflow_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowStepService.get_steps_by_workflow(
        db=db,
        workflow_id=workflow_id,
        company_id=current_user.company_id,
    )


@router.put(
    "/{workflow_step_id}",
    response_model=WorkflowStepResponse,
)
def update_workflow_step(
    workflow_step_id: int,
    workflow_step: WorkflowStepUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowStepService.update_workflow_step(
        db=db,
        workflow_step_id=workflow_step_id,
        workflow_step=workflow_step,
        company_id=current_user.company_id,
    )


@router.delete(
    "/{workflow_step_id}",
)
def delete_workflow_step(
    workflow_step_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowStepService.delete_workflow_step(
        db=db,
        workflow_step_id=workflow_step_id,
        company_id=current_user.company_id,
    )