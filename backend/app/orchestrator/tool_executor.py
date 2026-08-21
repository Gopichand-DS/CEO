from app.tools.dashboard_tool import DashboardTool
from app.tools.employee_tool import EmployeeTool
from app.tools.project_tool import ProjectTool


class ToolExecutor:

    TOOLS = {
        "dashboard_tool": DashboardTool(),
        "employee_tool": EmployeeTool(),
        "project_tool": ProjectTool(),
    }

    @classmethod
    def execute(
        cls,
        db,
        company_id,
        plan,
    ):

        context = {}

        for step in plan.steps:

            tool = cls.TOOLS.get(step.tool)

            if tool is None:
                continue

            result = tool.execute(
                db=db,
                company_id=company_id,
            )

            context[step.tool] = result

        return context