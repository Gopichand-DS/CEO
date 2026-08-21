from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.workflow_instance import (
    WorkflowInstanceCreate,
    WorkflowInstanceResponse,
    WorkflowInstanceUpdate,
)

from app.services.workflow_instance_service import (
    WorkflowInstanceService,
)


router = APIRouter(
    prefix="/workflow-instances",
    tags=["Workflow Instances"],
)


@router.post(
    "/",
    response_model=WorkflowInstanceResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_workflow_instance(
    workflow_instance: WorkflowInstanceCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowInstanceService.create_workflow_instance(
        db=db,
        workflow_instance=workflow_instance,
        company_id=current_user.company_id,
    )


@router.get(
    "/",
    response_model=List[WorkflowInstanceResponse],
)
def get_all_workflow_instances(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowInstanceService.get_all_workflow_instances(
        db=db,
        company_id=current_user.company_id,
    )


@router.get(
    "/{workflow_instance_id}",
    response_model=WorkflowInstanceResponse,
)
def get_workflow_instance_by_id(
    workflow_instance_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowInstanceService.get_workflow_instance_by_id(
        db=db,
        workflow_instance_id=workflow_instance_id,
        company_id=current_user.company_id,
    )


@router.get(
    "/employee/{employee_id}",
    response_model=List[WorkflowInstanceResponse],
)
def get_workflow_instances_by_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowInstanceService.get_workflow_instances_by_employee(
        db=db,
        employee_id=employee_id,
        company_id=current_user.company_id,
    )


@router.get(
    "/workflow/{workflow_id}",
    response_model=List[WorkflowInstanceResponse],
)
def get_workflow_instances_by_workflow(
    workflow_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowInstanceService.get_workflow_instances_by_workflow(
        db=db,
        workflow_id=workflow_id,
        company_id=current_user.company_id,
    )


@router.put(
    "/{workflow_instance_id}",
    response_model=WorkflowInstanceResponse,
)
def update_workflow_instance(
    workflow_instance_id: int,
    workflow_instance: WorkflowInstanceUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowInstanceService.update_workflow_instance(
        db=db,
        workflow_instance_id=workflow_instance_id,
        workflow_instance=workflow_instance,
        company_id=current_user.company_id,
    )


@router.delete(
    "/{workflow_instance_id}",
)
def delete_workflow_instance(
    workflow_instance_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowInstanceService.delete_workflow_instance(
        db=db,
        workflow_instance_id=workflow_instance_id,
        company_id=current_user.company_id,
    )