from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.workflow_audit_repository import (
    WorkflowAuditRepository,
)
from app.repositories.workflow_instance_repository import (
    WorkflowInstanceRepository,
)


class WorkflowAuditService:

    @staticmethod
    def create_audit_log(
        db: Session,
        workflow_instance_id: int,
        action: str,
        performed_by: str,
        company_id: int,
        remarks: str | None = None,
    ):
        workflow_instance = (
            WorkflowInstanceRepository.get_by_id(
                db=db,
                workflow_instance_id=workflow_instance_id,
                company_id=company_id,
            )
        )

        if not workflow_instance:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow instance not found",
            )

        return WorkflowAuditRepository.create(
            db=db,
            company_id=company_id,
            workflow_instance_id=workflow_instance_id,
            action=action,
            performed_by=performed_by,
            remarks=remarks,
        )

    @staticmethod
    def get_workflow_history(
        db: Session,
        workflow_instance_id: int,
        company_id: int,
    ):
        workflow_instance = (
            WorkflowInstanceRepository.get_by_id(
                db=db,
                workflow_instance_id=workflow_instance_id,
                company_id=company_id,
            )
        )

        if not workflow_instance:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow instance not found",
            )

        return WorkflowAuditRepository.get_by_workflow_instance(
            db=db,
            workflow_instance_id=workflow_instance_id,
            company_id=company_id,
        )