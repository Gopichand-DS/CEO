from sqlalchemy.orm import Session

from app.investigations.investigation_context import InvestigationContext
from app.investigations.investigation_result import InvestigationResult
from app.services.investigation_service import InvestigationService

from app.repositories.workflow_repository import WorkflowRepository
from app.schemas.ai import WorkflowSubIntent


class WorkflowAnalyzer:

    @staticmethod
    def analyze(
        db: Session,
        company_id: int,
        message: str,
        sub_intent: WorkflowSubIntent,
    ) -> InvestigationResult:

        if sub_intent == WorkflowSubIntent.LIST:
            return WorkflowAnalyzer.list_workflows(
                db=db,
                company_id=company_id,
                message=message,
            )

        elif sub_intent == WorkflowSubIntent.STATUS:
            return WorkflowAnalyzer.workflow_status(
                db=db,
                company_id=company_id,
                message=message,
            )

        return WorkflowAnalyzer.workflow_status(
            db=db,
            company_id=company_id,
            message=message,
        )

    @staticmethod
    def list_workflows(
        db: Session,
        company_id: int,
        message: str,
    ) -> InvestigationResult:

        workflows = WorkflowRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        workflow_list = [
            {
                "id": workflow.id,
                "workflow_code": workflow.workflow_code,
                "workflow_name": workflow.workflow_name,
                "description": workflow.description,
                "is_active": workflow.is_active,
            }
            for workflow in workflows
        ]

        context = InvestigationContext(
            title="Workflow List",
            user_query=message,
            summary=f"Found {len(workflows)} workflow(s).",
            data={
                "total_workflows": len(workflows),
                "workflows": workflow_list,
            },
        )

        return InvestigationService.investigate(context)

    @staticmethod
    def workflow_status(
        db: Session,
        company_id: int,
        message: str,
    ) -> InvestigationResult:

        analytics = WorkflowRepository.get_workflow_analytics(
            db=db,
            company_id=company_id,
        )

        findings = [
            f"Total workflows: {analytics['total_workflows']}",
            f"Active workflows: {analytics['active_workflows']}",
            f"Inactive workflows: {analytics['inactive_workflows']}",
        ]

        recommendations = []

        if analytics["inactive_workflows"] > 0:
            recommendations.append(
                "Review inactive workflows and remove obsolete workflow definitions."
            )

        if analytics["active_workflows"] == 0:
            recommendations.append(
                "No active workflows found. Verify workflow configuration."
            )

        if not recommendations:
            recommendations.append(
                "Workflow definitions are healthy. Continue monitoring."
            )

        context = InvestigationContext(
            title="Workflow Status Investigation",
            user_query=message,
            summary="Workflow status analysis completed.",
            data=analytics,
        )

        return InvestigationService.investigate(
            context=context,
            findings=findings,
            recommendations=recommendations,
            confidence=0.95,
        )