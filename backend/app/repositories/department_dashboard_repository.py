from sqlalchemy.orm import Session

from app.models.department import Department


class DepartmentDashboardRepository:

    @staticmethod
    def get_department_performance(
        db: Session,
        company_id: int,
    ):

        departments = (
            db.query(Department)
            .filter(
                Department.company_id == company_id
            )
            .all()
        )

        result = []

        for department in departments:

            total_projects = len(
                department.projects
            )

            completed_projects = sum(
                1
                for project in department.projects
                if project.status == "COMPLETED"
            )

            performance = 0

            if total_projects:
                performance = round(
                    (
                        completed_projects
                        / total_projects
                    )
                    * 100,
                    2,
                )

            if performance >= 90:
                status = "Excellent"

            elif performance >= 70:
                status = "Good"

            else:
                status = "Needs Attention"

            result.append(
                {
                    "id": department.id,
                    "department": department.name,
                    "performance": performance,
                    "employees": len(
                        department.employees
                    ),
                    "status": status,
                }
            )

        return result