from sqlalchemy.orm import Session

from app.models.workflow import Workflow
from app.schemas.workflow import (
    WorkflowCreate,
    WorkflowUpdate,
)


class WorkflowRepository:

    @staticmethod
    def create(
        db: Session,
        workflow: WorkflowCreate,
        company_id: int,
    ):
        db_workflow = Workflow(
            workflow_code=workflow.workflow_code,
            workflow_name=workflow.workflow_name,
            description=workflow.description,
            company_id=company_id,
            is_active=workflow.is_active,
        )

        db.add(db_workflow)
        db.commit()
        db.refresh(db_workflow)

        return db_workflow

    @staticmethod
    def get_all(
        db: Session,
        company_id: int,
    ):
        return (
            db.query(Workflow)
            .filter(
                Workflow.company_id == company_id
            )
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        workflow_id: int,
        company_id: int,
    ):
        return (
            db.query(Workflow)
            .filter(
                Workflow.id == workflow_id,
                Workflow.company_id == company_id,
            )
            .first()
        )

    @staticmethod
    def get_all_by_company(
        db: Session,
        company_id: int,
    ):
        return (
            db.query(Workflow)
            .filter(
                Workflow.company_id == company_id
            )
            .all()
        )

    @staticmethod
    def get_workflow_analytics(
        db: Session,
        company_id: int,
    ):

        workflows = WorkflowRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        total_workflows = len(workflows)

        active_workflows = sum(
            1
            for workflow in workflows
            if workflow.is_active
        )

        inactive_workflows = (
            total_workflows - active_workflows
        )

        return {
            "total_workflows": total_workflows,
            "active_workflows": active_workflows,
            "inactive_workflows": inactive_workflows,
        }

    @staticmethod
    def update(
        db: Session,
        db_workflow: Workflow,
        workflow: WorkflowUpdate,
    ):
        update_data = workflow.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(
                db_workflow,
                key,
                value,
            )

        db.commit()
        db.refresh(db_workflow)

        return db_workflow

    @staticmethod
    def delete(
        db: Session,
        db_workflow: Workflow,
    ):
        db.delete(db_workflow)
        db.commit()

        return True

    @staticmethod
    def get_by_workflow_code(
        db: Session,
        company_id: int,
        workflow_code: str,
    ):
        return (
            db.query(Workflow)
            .filter(
                Workflow.company_id == company_id,
                Workflow.workflow_code == workflow_code,
            )
            .first()
        )