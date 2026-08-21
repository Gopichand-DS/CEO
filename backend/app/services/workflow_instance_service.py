from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.employee_repository import EmployeeRepository
from app.repositories.workflow_repository import WorkflowRepository
from app.repositories.workflow_instance_repository import (
    WorkflowInstanceRepository,
)

from app.schemas.workflow_instance import (
    WorkflowInstanceCreate,
    WorkflowInstanceUpdate,
)


class WorkflowInstanceService:

    @staticmethod
    def create_workflow_instance(
        db: Session,
        workflow_instance: WorkflowInstanceCreate,
        company_id: int,
    ):
        # ---------------------------------
        # Verify workflow belongs to company
        # ---------------------------------
        workflow = WorkflowRepository.get_by_id(
            db=db,
            workflow_id=workflow_instance.workflow_id,
            company_id=company_id,
        )

        if not workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow not found",
            )

        # ---------------------------------
        # Verify employee belongs to company
        # ---------------------------------
        employee = EmployeeRepository.get_by_id(
            db=db,
            employee_id=workflow_instance.employee_id,
            company_id=company_id,
        )

        if not employee:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Employee not found",
            )

        # ---------------------------------
        # Create instance
        # ---------------------------------
        return WorkflowInstanceRepository.create(
            db=db,
            workflow_instance=workflow_instance,
        )

    @staticmethod
    def get_all_workflow_instances(
        db: Session,
        company_id: int,
    ):
        return WorkflowInstanceRepository.get_all(
            db=db,
            company_id=company_id,
        )

    @staticmethod
    def get_workflow_instance_by_id(
        db: Session,
        workflow_instance_id: int,
        company_id: int,
    ):
        db_workflow_instance = (
            WorkflowInstanceRepository.get_by_id(
                db=db,
                workflow_instance_id=workflow_instance_id,
                company_id=company_id,
            )
        )

        if not db_workflow_instance:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow instance not found",
            )

        return db_workflow_instance

    @staticmethod
    def get_workflow_instances_by_employee(
        db: Session,
        employee_id: int,
        company_id: int,
    ):
        # Verify employee belongs to current company
        employee = EmployeeRepository.get_by_id(
            db=db,
            employee_id=employee_id,
            company_id=company_id,
        )

        if not employee:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Employee not found",
            )

        return WorkflowInstanceRepository.get_by_employee(
            db=db,
            employee_id=employee_id,
            company_id=company_id,
        )

    @staticmethod
    def get_workflow_instances_by_workflow(
        db: Session,
        workflow_id: int,
        company_id: int,
    ):
        # Verify workflow belongs to current company
        workflow = WorkflowRepository.get_by_id(
            db=db,
            workflow_id=workflow_id,
            company_id=company_id,
        )

        if not workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow not found",
            )

        return WorkflowInstanceRepository.get_by_workflow(
            db=db,
            workflow_id=workflow_id,
            company_id=company_id,
        )

    @staticmethod
    def update_workflow_instance(
        db: Session,
        workflow_instance_id: int,
        workflow_instance: WorkflowInstanceUpdate,
        company_id: int,
    ):
        # ---------------------------------
        # Get existing instance in tenant
        # ---------------------------------
        db_workflow_instance = (
            WorkflowInstanceRepository.get_by_id(
                db=db,
                workflow_instance_id=workflow_instance_id,
                company_id=company_id,
            )
        )

        if not db_workflow_instance:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow instance not found",
            )

        # ---------------------------------
        # Validate new workflow
        # ---------------------------------
        workflow_id = (
            workflow_instance.workflow_id
            if workflow_instance.workflow_id is not None
            else db_workflow_instance.workflow_id
        )

        workflow = WorkflowRepository.get_by_id(
            db=db,
            workflow_id=workflow_id,
            company_id=company_id,
        )

        if not workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow not found",
            )

        # ---------------------------------
        # Validate new employee
        # ---------------------------------
        employee_id = (
            workflow_instance.employee_id
            if workflow_instance.employee_id is not None
            else db_workflow_instance.employee_id
        )

        employee = EmployeeRepository.get_by_id(
            db=db,
            employee_id=employee_id,
            company_id=company_id,
        )

        if not employee:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Employee not found",
            )

        # ---------------------------------
        # Update
        # ---------------------------------
        return WorkflowInstanceRepository.update(
            db=db,
            db_workflow_instance=db_workflow_instance,
            workflow_instance=workflow_instance,
        )

    @staticmethod
    def delete_workflow_instance(
        db: Session,
        workflow_instance_id: int,
        company_id: int,
    ):
        db_workflow_instance = (
            WorkflowInstanceRepository.get_by_id(
                db=db,
                workflow_instance_id=workflow_instance_id,
                company_id=company_id,
            )
        )

        if not db_workflow_instance:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow instance not found",
            )

        WorkflowInstanceRepository.delete(
            db=db,
            db_workflow_instance=db_workflow_instance,
        )

        return {
            "message": "Workflow instance deleted successfully"
        }