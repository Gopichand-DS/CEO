from app.agents.dashboard_agent import DashboardAgent
from app.agents.employee_agent import EmployeeAgent
from app.agents.project_agent import ProjectAgent
from app.agents.general_agent import GeneralAgent

from app.services.intent_service import AIIntent


class AgentRouter:

    _agents = {
        AIIntent.DASHBOARD: DashboardAgent(),
        AIIntent.EMPLOYEE: EmployeeAgent(),
        AIIntent.PROJECT: ProjectAgent(),
        AIIntent.GENERAL: GeneralAgent(),
    }

    @classmethod
    def get_agent(
        cls,
        intent: AIIntent,
    ):

        return cls._agents.get(
            intent,
            GeneralAgent(),
        )