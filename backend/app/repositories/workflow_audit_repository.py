from sqlalchemy.orm import Session
from app.models.workflow_instance import WorkflowInstance
from app.models.workflow import Workflow
from app.models.workflow_audit import WorkflowAudit


class WorkflowAuditRepository:

    @staticmethod
    def create(
        db: Session,
        company_id: int,
        workflow_instance_id: int,
        action: str,
        performed_by: str,
        remarks: str | None = None,
    ):
        instance = (
            db.query(WorkflowInstance)
            .join(
                Workflow,
                Workflow.id == WorkflowInstance.workflow_id,
            )
            .filter(
                WorkflowInstance.id == workflow_instance_id,
                Workflow.company_id == company_id,
            )
            .first()
        )

        if not instance:
            raise ValueError(
                "Workflow instance does not belong to the company."
            )

        audit = WorkflowAudit(
            workflow_instance_id=workflow_instance_id,
            action=action,
            performed_by=performed_by,
            remarks=remarks,
        )

        db.add(audit)
        db.commit()
        db.refresh(audit)

        return audit

    @staticmethod
    def get_by_workflow_instance(
        db: Session,
        workflow_instance_id: int,
        company_id: int,
    ):
        return (
            db.query(WorkflowAudit)
            .join(
                WorkflowInstance,
                WorkflowInstance.id
                == WorkflowAudit.workflow_instance_id,
            )
            .join(
                Workflow,
                Workflow.id
                == WorkflowInstance.workflow_id,
            )
            .filter(
                WorkflowAudit.workflow_instance_id
                == workflow_instance_id,
                Workflow.company_id == company_id,
            )
            .order_by(
                WorkflowAudit.performed_at.asc()
            )
            .all()
        )