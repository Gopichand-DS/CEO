from fastapi import FastAPI
from app.api.routers.company import router as company_router
from app.api.routers.health import router as health_router
from app.core.config import settings

from app.api.routers.user import router as user_router
from app.api.routers.auth import router as auth_router
from app.api.routers.employee import router as employee_router
from app.api.routers.team import router as team_router
from app.api.routers.project import router as project_router
from app.api.routers.task import router as task_router
from app.api.routers.workflow import router as workflow_router
from app.api.routers.workflow_step import router as workflow_step_router
from app.api.routers.workflow_instance import router as workflow_instance_router
from app.api.routers.workflow_execution import router as workflow_execution_router
from app.api.routers.workflow_audit import router as workflow_audit_router
from app.api.routers.document import router as document_router
from app.api.routers.ai import router as ai_router
from app.events.register import register_event_handlers
from app.api.routers.dashboard import router as dashboard_router
from app.api.routers.analytics import router as analytics_router
from app.api.routers.executive import router as executive_router
from app.api.routers.executive_analytics import router as executive_analytics_router
from app.api.routers.investigations import router as investigations_router
from app.api.routers.notifications import router as notifications_router
from app.api.routers import department
from app.api.routers.reports import router as reports_router
from app.rag.vector.vector_service import ( VectorService )

from app.api.routers.chat import router as chat_router
import app.models
from app.api.routers.finance import (
    router as finance_router,
)
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    debug=settings.debug,
)

@app.on_event("startup")
async def startup_event():

    VectorService.initialize()

origins = [
    settings.frontend_url,
    "https://ceo-q2ji.vercel.app",
    "https://ceo-q2ji-donre8gk-gopi-f826.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:5177",
    "http://localhost:5178",
    "http://localhost:5179",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(company_router)
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(employee_router)
app.include_router(department.router)
app.include_router(project_router)
app.include_router(team_router)
app.include_router(dashboard_router)
app.include_router(task_router)
app.include_router(workflow_router)
app.include_router(workflow_step_router)
app.include_router(workflow_instance_router)
app.include_router(workflow_execution_router)
app.include_router(workflow_audit_router)
app.include_router(ai_router)
app.include_router(analytics_router)
app.include_router(executive_router)
app.include_router(chat_router)
app.include_router(finance_router)
app.include_router(notifications_router)
app.include_router(reports_router)
app.include_router(document_router)
app.include_router(investigations_router)
app.include_router(executive_analytics_router)