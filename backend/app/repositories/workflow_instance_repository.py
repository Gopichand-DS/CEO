from sqlalchemy.orm import Session
from app.models.workflow import Workflow
from app.models.workflow_instance import WorkflowInstance
from app.schemas.workflow_instance import (
    WorkflowInstanceCreate,
    WorkflowInstanceUpdate,
)


class WorkflowInstanceRepository:

    @staticmethod
    def create(
        db: Session,
        workflow_instance: WorkflowInstanceCreate,
    ):
        db_workflow_instance = WorkflowInstance(
            workflow_id=workflow_instance.workflow_id,
            employee_id=workflow_instance.employee_id,
            current_step=workflow_instance.current_step,
            status=workflow_instance.status,
        )

        db.add(db_workflow_instance)
        db.commit()
        db.refresh(db_workflow_instance)

        return db_workflow_instance

    @staticmethod
    def get_all(
        db: Session,
        company_id: int,
    ):
        return (
            db.query(WorkflowInstance)
            .join(
                Workflow,
                Workflow.id == WorkflowInstance.workflow_id,
            )
            .filter(
                Workflow.company_id == company_id,
            )
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        workflow_instance_id: int,
        company_id: int,
    ):
        return (
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
    @staticmethod
    def get_by_employee(
        db: Session,
        employee_id: int,
        company_id: int,
    ):
        return (
            db.query(WorkflowInstance)
            .join(
                Workflow,
                Workflow.id == WorkflowInstance.workflow_id,
            )
            .filter(
                WorkflowInstance.employee_id == employee_id,
                Workflow.company_id == company_id,
            )
            .all()
        )

    @staticmethod
    def get_by_workflow(
        db: Session,
        workflow_id: int,
        company_id: int,
    ):
        return (
            db.query(WorkflowInstance)
            .join(  
                Workflow,
                Workflow.id == WorkflowInstance.workflow_id,
            )
            .filter(
                WorkflowInstance.workflow_id == workflow_id,
                Workflow.company_id == company_id,
            )
            .all()
        )

    @staticmethod
    def update(
        db: Session,
        db_workflow_instance: WorkflowInstance,
        workflow_instance: WorkflowInstanceUpdate,
    ):
        update_data = workflow_instance.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_workflow_instance, key, value)

        db.commit()
        db.refresh(db_workflow_instance)

        return db_workflow_instance

    @staticmethod
    def delete(
        db: Session,
        db_workflow_instance: WorkflowInstance,
    ):
        db.delete(db_workflow_instance)
        db.commit()