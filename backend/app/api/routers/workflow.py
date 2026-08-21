from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.workflow import (
    WorkflowCreate,
    WorkflowUpdate,
    WorkflowResponse,
)

from app.services.workflow_service import (
    WorkflowService,
)


router = APIRouter(
    prefix="/workflows",
    tags=["Workflows"],
)


@router.post(
    "/",
    response_model=WorkflowResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_workflow(
    workflow: WorkflowCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return WorkflowService.create_workflow(
        db=db,
        workflow=workflow,
        company_id=current_user.company_id,
    )


@router.get(
    "/",
    response_model=List[WorkflowResponse],
)
def get_all_workflows(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return WorkflowService.get_all_workflows(
        db=db,
        company_id=current_user.company_id,
    )


@router.get(
    "/{workflow_id}",
    response_model=WorkflowResponse,
)
def get_workflow_by_id(
    workflow_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return WorkflowService.get_workflow_by_id(
        db=db,
        workflow_id=workflow_id,
        company_id=current_user.company_id,
    )


@router.put(
    "/{workflow_id}",
    response_model=WorkflowResponse,
)
def update_workflow(
    workflow_id: int,
    workflow: WorkflowUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return WorkflowService.update_workflow(
        db=db,
        workflow_id=workflow_id,
        workflow=workflow,
        company_id=current_user.company_id,
    )


@router.delete(
    "/{workflow_id}",
)
def delete_workflow(
    workflow_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return WorkflowService.delete_workflow(
        db=db,
        workflow_id=workflow_id,
        company_id=current_user.company_id,
    )