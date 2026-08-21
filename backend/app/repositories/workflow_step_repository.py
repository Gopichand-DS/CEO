from sqlalchemy.orm import Session
from app.models.workflow import Workflow
from app.models.workflow_step import WorkflowStep
from app.schemas.workflow_step import (
    WorkflowStepCreate,
    WorkflowStepUpdate,
)


class WorkflowStepRepository:

    @staticmethod
    def create(
        db: Session,
        workflow_step: WorkflowStepCreate,
    ):
        db_workflow_step = WorkflowStep(
            workflow_id=workflow_step.workflow_id,
            step_order=workflow_step.step_order,
            step_name=workflow_step.step_name,
            description=workflow_step.description,
            is_required=workflow_step.is_required,
        )

        db.add(db_workflow_step)
        db.commit()
        db.refresh(db_workflow_step)

        return db_workflow_step

    @staticmethod
    def get_all(db: Session):
        return db.query(WorkflowStep).all()

    @staticmethod
    def get_by_id(
        db: Session,
        workflow_step_id: int,
        company_id: int,
    ):
        return (
            db.query(WorkflowStep)
            .join(
                Workflow,
                Workflow.id == WorkflowStep.workflow_id,
            )
            .filter(
                WorkflowStep.id == workflow_step_id,
                Workflow.company_id == company_id,
            )
            .first()
        )

    @staticmethod
    def get_by_workflow(
        db: Session,
        workflow_id: int,
        company_id: int,
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
            )
            .order_by(
                WorkflowStep.step_order
            )
            .all()
        )

    @staticmethod
    def get_by_workflow_and_order(
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
    def update(
        db: Session,
        db_workflow_step: WorkflowStep,
        workflow_step: WorkflowStepUpdate,
    ):
        update_data = workflow_step.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_workflow_step, key, value)

        db.commit()
        db.refresh(db_workflow_step)

        return db_workflow_step

    @staticmethod
    def delete(
        db: Session,
        db_workflow_step: WorkflowStep,
    ):
        db.delete(db_workflow_step)
        db.commit()

    @staticmethod
    def get_all_by_company(
        db: Session,
        company_id: int,
    ):
        return (
            db.query(WorkflowStep)
            .join(
                Workflow,
                Workflow.id == WorkflowStep.workflow_id,
            )
            .filter(
                Workflow.company_id == company_id,
            )
            .order_by(
                WorkflowStep.workflow_id,
                WorkflowStep.step_order,
            )
            .all()
        )