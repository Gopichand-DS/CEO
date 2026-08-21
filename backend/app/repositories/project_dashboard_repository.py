from sqlalchemy.orm import Session

from app.models.project import Project

from app.services.task_service import TaskService


class ProjectDashboardRepository:

    @staticmethod
    def get_project_status(
        db: Session,
        company_id: int,
    ):

        projects = (
            db.query(Project)
            .filter(Project.company_id == company_id)
            .all()
        )

        result = []

        for project in projects:

            summary = TaskService.get_project_task_summary(
                db=db,
                project_id=project.id,
                company_id=company_id,
            )

            progress = 0

            if summary["total_tasks"] > 0:
                progress = round(
                    (
                        summary["completed_tasks"]
                        / summary["total_tasks"]
                    )
                    * 100,
                    2,
                )

            result.append(
                {
                    "id": project.id,
                    "project": project.name,
                    "manager": "Not Assigned",
                    "progress": progress,
                    "status": project.status,
                    "due_date": project.end_date,
                }
            )

        return result





    