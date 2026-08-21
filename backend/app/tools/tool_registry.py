from app.tools.dashboard_tool import DashboardTool
from app.tools.employee_tool import EmployeeTool
from app.tools.department_tool import DepartmentTool
from app.tools.project_tool import ProjectTool
from app.tools.task_tool import TaskTool
from app.tools.analytics_tool import AnalyticsTool
from app.tools.investigation_tool import InvestigationTool
from app.tools.workflow_tool import WorkflowTool
from app.tools.finance_tool import FinanceTool


class ToolRegistry:

    TOOLS = {
        "dashboard_tool": DashboardTool(),
        "employee_tool": EmployeeTool(),
        "department_tool": DepartmentTool(),
        "project_tool": ProjectTool(),
        "task_tool": TaskTool(),
        "analytics_tool": AnalyticsTool(),
        "investigation_tool": InvestigationTool(),
        "workflow_tool": WorkflowTool(),
        "finance_tool": FinanceTool(),
    }

    @classmethod
    def get_tool(cls, name: str):
        return cls.TOOLS.get(name)

    @classmethod
    def list_tools(cls):
        return list(cls.TOOLS.keys())

    @classmethod
    def execute(
        cls,
        tool_name: str,
        db,
        company_id: int,
        **kwargs,
    ):

        tool = cls.get_tool(tool_name)

        if tool is None:
            raise ValueError(
                f"Unknown tool: {tool_name}"
            )

        return tool.execute(
            db=db,
            company_id=company_id,
            **kwargs,
        )