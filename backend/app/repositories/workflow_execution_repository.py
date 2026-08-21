from sqlalchemy.orm import Session
from app.models.workflow import Workflow
from app.models.workflow_instance import WorkflowInstance
from app.models.workflow_step import WorkflowStep


class WorkflowExecutionRepository:

    @staticmethod
    def get_instance(
        db: Session,
        instance_id: int,
        company_id: int,
    ):
        return (
            db.query(WorkflowInstance)
            .join(
                Workflow,
                Workflow.id == WorkflowInstance.workflow_id,
            )
            .filter(
                WorkflowInstance.id == instance_id,
                Workflow.company_id == company_id,
            )  
            .first()
        )

    @staticmethod
    def get_current_step(
        db: Session,
        workflow_id: int,
        company_id: int,
        step_order: int,
    ):
        return (
            db.query(WorkflowStep)
            .join(
                Workflow,
                Workflow.id == WorkflowStep.workflow_id,
            )
            .filter(
                WorkflowStep.workflow_id == workflow_id,
                Workflow.company_id == company_id,
                WorkflowStep.step_order == step_order,
            )
            .first()
        )
    @staticmethod
    def get_next_step(
        db: Session,
        workflow_id: int,
        company_id: int,
        current_step: int,
    ):
        return (
            db.query(WorkflowStep)
            .join(
                Workflow,
                Workflow.id == WorkflowStep.workflow_id,
            )
            .filter(
                WorkflowStep.workflow_id == workflow_id,
                Workflow.company_id == company_id,
                WorkflowStep.step_order == current_step + 1,
            )
            .first()
        )

    @staticmethod
    def save(
        db: Session,
        workflow_instance: WorkflowInstance,
    ):
        db.commit()
        db.refresh(workflow_instance)

        return workflow_instance