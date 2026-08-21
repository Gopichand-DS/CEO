from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.project_repository import ProjectRepository
from app.schemas.project import (
    ProjectCreate,
    ProjectUpdate,
)


class ProjectService:

    @staticmethod
    def create_project(
        db: Session,
        project: ProjectCreate,
        company_id: int,
    ):
        # Never allow the client to create a project
        # under another company.
        if project.company_id != company_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Cannot create project for another company",
            )

        return ProjectRepository.create(
            db=db,
            project=project,
        )

    @staticmethod
    def get_projects(
        db: Session,
        company_id: int,
    ):
        return ProjectRepository.get_all(
            db=db,
            company_id=company_id,
        )

    @staticmethod
    def get_project(
        db: Session,
        project_id: int,
        company_id: int,
    ):
        project = ProjectRepository.get_by_id(
            db=db,
            project_id=project_id,
            company_id=company_id,
        )

        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found",
            )

        return project

    @staticmethod
    def update_project(
        db: Session,
        project_id: int,
        project: ProjectUpdate,
        company_id: int,
    ):
        existing_project = ProjectRepository.get_by_id(
            db=db,
            project_id=project_id,
            company_id=company_id,
        )

        if not existing_project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found",
            )

        # Prevent moving an existing project into
        # another company through the update payload.
        if (
            hasattr(project, "company_id")
            and project.company_id is not None
            and project.company_id != company_id
        ):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Cannot move project to another company",
            )

        return ProjectRepository.update(
            db=db,
            project_id=project_id,
            company_id=company_id,
            project=project,
        )

    @staticmethod
    def delete_project(
        db: Session,
        project_id: int,
        company_id: int,
    ):
        existing_project = ProjectRepository.get_by_id(
            db=db,
            project_id=project_id,
            company_id=company_id,
        )

        if not existing_project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found",
            )

        return ProjectRepository.delete(
            db=db,
            project_id=project_id,
            company_id=company_id,
        )