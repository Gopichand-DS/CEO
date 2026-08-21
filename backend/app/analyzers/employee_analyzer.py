from sqlalchemy.orm import Session
from app.ai.sub_intent import AISubIntent
from app.repositories.employee_repository import EmployeeRepository
from app.investigations.investigation_context import InvestigationContext
from app.investigations.investigation_result import InvestigationResult

class EmployeeAnalyzer:

    @staticmethod
    def analyze(
        db: Session,
        company_id: int,
        message: str,
        sub_intent: AISubIntent,
    ):

        if sub_intent == AISubIntent.EMPLOYEE_LIST:
            return EmployeeAnalyzer.list_employees(
                db=db,
                company_id=company_id,
            )

        if sub_intent == AISubIntent.EMPLOYEE_WORKLOAD:
            return EmployeeAnalyzer.employee_workload(
                db=db,
                company_id=company_id,
                question=message,
            )

        if sub_intent == AISubIntent.EMPLOYEE_PERFORMANCE:
            return EmployeeAnalyzer.employee_performance(
                db=db,
                company_id=company_id,
                question=message,
            )

        return {
            "message": "Employee analysis not supported."
        }

    @staticmethod
    def list_employees(
        db: Session,
        company_id: int,
    ):

        employees = EmployeeRepository.get_all_by_company(
            db=db,
            company_id=company_id,
        )

        return {
            "total_employees": len(employees),
            "employees": [
                {
                    "id": employee.id,
                    "name": employee.full_name,
                    "designation": employee.designation,
                }
                for employee in employees
            ],
        }

    @staticmethod
    def _employee_performance(
        context: InvestigationContext,
    ):

        analytics = context.employee_analytics

        findings = [
            f"Total employees: {analytics['total_employees']}"
        ]

        recommendations = [
            "Review employee KPIs regularly.",
            "Recognize high-performing employees.",
        ]

        return InvestigationResult(
            investigation_type=context.investigation_type,
            summary="Employee performance investigation completed.",
            findings=findings,
            recommendations=recommendations,
            confidence=0.90,
        )