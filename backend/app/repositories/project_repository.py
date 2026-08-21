from sqlalchemy.orm import Session
from datetime import date

today = date.today()
from app.models.project import Project
from app.schemas.project import (
    ProjectCreate,
    ProjectUpdate,
)


class ProjectRepository:

    @staticmethod
    def create(
        db: Session,
        project: ProjectCreate,
    ):
        db_project = Project(
            **project.model_dump()
        )

        db.add(db_project)
        db.commit()
        db.refresh(db_project)

        return db_project

    @staticmethod
    def get_all(
        db: Session,
        company_id: int,
    ):
        return (
            db.query(Project)
            .filter(
                Project.company_id == company_id
            )
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        project_id: int,
        company_id: int,
    ):
        return (
            db.query(Project)
            .filter(
                Project.id == project_id,
                Project.company_id == company_id,
            )
            .first()
        )

    @staticmethod
    def update(
        db: Session,
        project_id: int,
        company_id: int,
        project: ProjectUpdate,
    ):
        db_project = (
            db.query(Project)
            .filter(
                Project.id == project_id,
                Project.company_id == company_id,
            )
            .first()
        )

        if not db_project:
            return None
        

        update_data = project.model_dump(
            exclude_unset=True,
        )

        for key, value in update_data.items():
            setattr(db_project, key, value)

        db.commit()
        db.refresh(db_project)

        return db_project

    @staticmethod
    def delete(
        db: Session,
        project_id: int,
        company_id: int,
    ):
        db_project = (
            db.query(Project)
            .filter(
                Project.id == project_id,
                Project.company_id == company_id,
            )
            .first()
        )

        if not db_project:
            return None

        db.delete(db_project)
        db.commit()

        return db_project
    

    @staticmethod
    def get_by_status(
        db: Session,
        company_id: int,
        status: str,
    ):
        return (
            db.query(Project)
            .filter(
                Project.company_id == company_id,
                Project.status == status,
            )
            .all()
        )

    @staticmethod
    def count_by_status(
        db: Session,
        company_id: int,
        status: str,
    ):
        return (
            db.query(Project)
            .filter(
                Project.company_id == company_id,
                Project.status == status,
            )
            .count()
        )

    @staticmethod
    def get_active(
        db: Session,
        company_id: int,
    ):
        return ProjectRepository.get_by_status(
            db,
            company_id,
            "ACTIVE",
        )

    @staticmethod
    def get_completed(
        db: Session,
        company_id: int,
    ):
        return ProjectRepository.get_by_status(
            db,
            company_id,
            "COMPLETED",
        )


    @staticmethod
    def get_planned(
        db: Session,
        company_id: int,
    ):
        return ProjectRepository.get_by_status(
            db,
            company_id,
            "PLANNED",
        )

    @staticmethod
    def get_all_by_company(
        db: Session,
        company_id: int,
    ):
        return (
            db.query(Project)
            .filter(Project.company_id == company_id)
            .all()
        )


    @staticmethod
    def get_project_analytics(
        db: Session,
        company_id: int,
    ):
        projects = ProjectRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        total_projects = len(projects)

        planned_projects = sum(
            1 for project in projects
            if project.status == "PLANNED"
        )

        active_projects = sum(
            1 for project in projects
            if project.status == "ACTIVE"
        )

        in_progress_projects = sum(
            1 for project in projects
            if project.status == "IN_PROGRESS"
        )

        completed_projects = sum(
            1 for project in projects
            if project.status == "COMPLETED"
        )

        cancelled_projects = sum(
            1 for project in projects
            if project.status == "CANCELLED"
        )

        delayed_projects = sum(
            1
            for project in projects
            if (
                project.status != "COMPLETED"
                and project.end_date
                and today > project.end_date
            )
        )

        return {
            "total_projects": total_projects,
            "planned_projects": planned_projects,
            "active_projects": active_projects,
            "in_progress_projects": in_progress_projects,
            "completed_projects": completed_projects,
            "cancelled_projects": cancelled_projects,
            "delayed_projects": delayed_projects,
        }