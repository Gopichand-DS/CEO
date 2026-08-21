from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.workflow_audit import WorkflowAuditResponse
from app.services.workflow_audit_service import WorkflowAuditService
from app.core.dependencies import get_current_user


router = APIRouter(
    prefix="/workflow-audits",
    tags=["Workflow Audits"],
)


@router.get(
    "/{workflow_instance_id}",
    response_model=List[WorkflowAuditResponse],
)
def get_workflow_history(
    workflow_instance_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return WorkflowAuditService.get_workflow_history(
        db=db,
        workflow_instance_id=workflow_instance_id,
        company_id=current_user.company_id,
    )


@router.get(
    "/{workflow_instance_id}/latest",
    response_model=WorkflowAuditResponse,
)
def get_latest_workflow_event(
    workflow_instance_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    history = WorkflowAuditService.get_workflow_history(
        db=db,
        workflow_instance_id=workflow_instance_id,
        company_id=current_user.company_id,
    )

    if not history:
        return None

    return history[-1]