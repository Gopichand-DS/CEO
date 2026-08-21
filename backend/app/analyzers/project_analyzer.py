from sqlalchemy.orm import Session

from app.ai.sub_intent import AISubIntent
from app.investigations.investigation_types import InvestigationType
from app.investigations.investigation_result import InvestigationResult

from app.repositories.project_repository import ProjectRepository
from app.repositories.task_repository import TaskRepository
from app.models.task import TaskStatus


class ProjectAnalyzer:

    @staticmethod
    def analyze(
        db: Session,
        company_id: int,
        message: str,
        sub_intent: AISubIntent,
    ):

        if sub_intent == AISubIntent.PROJECT_LIST:
            return ProjectAnalyzer.list_projects(
                db=db,
                company_id=company_id,
            )

        if sub_intent == AISubIntent.PROJECT_PROGRESS:
            return ProjectAnalyzer.project_progress(
                db=db,
                company_id=company_id,
            )

        if sub_intent == AISubIntent.PROJECT_BUDGET:
            return ProjectAnalyzer.project_budget(
                db=db,
                company_id=company_id,
            )

        if sub_intent == AISubIntent.PROJECT_DELAY:
            return ProjectAnalyzer.project_delay(
                db=db,
                company_id=company_id,
                question=message,
            )

        if sub_intent == AISubIntent.PROJECT_RISK:
            return ProjectAnalyzer.project_risk(
                db=db,
                company_id=company_id,
                question=message,
            )

        return {
            "message": "Project analysis not supported."
        }

    # -----------------------------------------
    # PROJECT LIST
    # -----------------------------------------

    @staticmethod
    def list_projects(
        db: Session,
        company_id: int,
    ):

        projects = ProjectRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        return {
            "total_projects": len(projects),
            "projects": [
                {
                    "id": project.id,
                    "name": project.name,
                    "status": (
                        project.status.value
                        if hasattr(project.status, "value")
                        else project.status
                    ),
                }
                for project in projects
            ],
        }

    # -----------------------------------------
    # PROJECT PROGRESS
    # -----------------------------------------

    @staticmethod
    def project_progress(
        db: Session,
        company_id: int,
    ):

        projects = ProjectRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        return {
            "total_projects": len(projects),
            "completed_projects": sum(
                1
                for project in projects
                if project.status == "COMPLETED"
            ),
            "in_progress_projects": sum(
                1
                for project in projects
                if project.status == "IN_PROGRESS"
            ),
            "planned_projects": sum(
                1
                for project in projects
                if project.status == "PLANNED"
            ),
        }

    # -----------------------------------------
    # PROJECT BUDGET
    # -----------------------------------------

    @staticmethod
    def project_budget(
        db: Session,
        company_id: int,
    ):

        projects = ProjectRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        total_budget = sum(
            project.budget or 0
            for project in projects
        )

        return {
            "total_budget": float(total_budget),
            "projects": [
                {
                    "id": project.id,
                    "name": project.name,
                    "budget": float(project.budget or 0),
                }
                for project in projects
            ],
        }

    # -----------------------------------------
    # PROJECT DELAY
    # -----------------------------------------

    @staticmethod
    def project_delay(
        db: Session,
        company_id: int,
        question: str,
    ):

        projects = ProjectRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        tasks = TaskRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        project_analytics = ProjectRepository.get_project_analytics(
            db=db,
            company_id=company_id,
        )

        overdue_tasks = [
            task
            for task in tasks
            if (
                task.status != TaskStatus.DONE
                and task.due_date
                and task.due_date < __import__("datetime").date.today()
            )
        ]

        pending_tasks = [
            task
            for task in tasks
            if task.status == TaskStatus.TODO
        ]

        project_data = [
            {
                "id": project.id,
                "name": project.name,
                "status": (
                    project.status.value
                    if hasattr(project.status, "value")
                    else project.status
                ),
                "start_date": (
                    project.start_date.isoformat()
                    if project.start_date
                    else None
                ),
                "end_date": (
                    project.end_date.isoformat()
                    if project.end_date
                    else None
                ),
            }
            for project in projects
        ]

        overdue_task_data = [
            {
                "id": task.id,
                "title": task.title,
                "status": task.status.value,
                "priority": task.priority.value,
                "project_id": task.project_id,
                "due_date": (
                    task.due_date.isoformat()
                    if task.due_date
                    else None
                ),
            }
            for task in overdue_tasks
        ]

        pending_task_data = [
            {
                "id": task.id,
                "title": task.title,
                "status": task.status.value,
                "priority": task.priority.value,
                "project_id": task.project_id,
                "due_date": (
                    task.due_date.isoformat()
                    if task.due_date
                    else None
                ),
            }
            for task in pending_tasks
        ]

        delayed_projects = project_analytics.get(
            "delayed_projects",
            0,
        )

        total_projects = project_analytics.get(
            "total_projects",
            0,
        )

        findings = []

        if delayed_projects > 0:
            findings.append(
                f"{delayed_projects} of "
                f"{total_projects} project(s) are delayed."
            )
        else:
            findings.append(
                "No delayed projects were detected."
            )

        if overdue_tasks:
            findings.append(
                f"{len(overdue_tasks)} overdue task(s) "
                f"may be contributing to project delays."
            )

        if pending_tasks:
            findings.append(
                f"{len(pending_tasks)} pending task(s) "
                f"remain incomplete."
            )

        if not overdue_tasks and not pending_tasks:
            findings.append(
                "No overdue or pending tasks were detected."
            )

        recommendations = [
            "Review overdue tasks immediately.",
            "Check task ownership and workload.",
            "Review project deadlines and dependencies.",
        ]

        return {
            "investigation_type": InvestigationType.PROJECT_DELAY.value,
            "question": question,
            "summary": (
                f"{delayed_projects} delayed project(s) "
                f"and {len(overdue_tasks)} overdue task(s) "
                f"were identified."
            ),
            "findings": findings,
            "projects": project_data,
            "project_analytics": project_analytics,
            "overdue_tasks": overdue_task_data,
            "pending_tasks": pending_task_data,
            "recommendations": recommendations,
        }

    # -----------------------------------------
    # PROJECT RISK
    # -----------------------------------------

    @staticmethod
    def project_risk(
        db: Session,
        company_id: int,
        question: str,
    ):

        analytics = ProjectRepository.get_project_analytics(
            db=db,
            company_id=company_id,
        )

        delayed = analytics.get(
            "delayed_projects",
            0,
        )

        active = analytics.get(
            "active_projects",
            0,
        )

        findings = []
        recommendations = []

        risk_score = 0

        if delayed > 0:

            risk_score += 40

            findings.append(
                f"{delayed} delayed project(s) detected."
            )

            recommendations.append(
                "Prioritize delayed projects."
            )

        if active > 10:

            risk_score += 20

            findings.append(
                "High number of active projects."
            )

            recommendations.append(
                "Review project resource allocation."
            )

        if risk_score == 0:

            summary = (
                "No significant project risks detected."
            )

        else:

            summary = (
                "Potential project risks require "
                "management attention."
            )

        return {
            "investigation_type": InvestigationType.PROJECT_RISK.value,
            "question": question,
            "summary": summary,
            "risk_score": risk_score,
            "findings": findings,
            "recommendations": recommendations,
            "project_analytics": analytics,
        }