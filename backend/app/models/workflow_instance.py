from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database.database import Base


class WorkflowInstance(Base):
    __tablename__ = "workflow_instances"

    id = Column(Integer, primary_key=True, index=True)

    workflow_id = Column(
        Integer,
        ForeignKey("workflows.id", ondelete="CASCADE"),
        nullable=False,
    )

    employee_id = Column(
        Integer,
        ForeignKey("employees.id", ondelete="CASCADE"),
        nullable=False,
    )

    current_step = Column(Integer, default=1)

    status = Column(
        String(30),
        default="Pending",
    )

    workflow = relationship(
        "Workflow",
        back_populates="instances",
    )

    employee = relationship(
        "Employee",
        back_populates="workflow_instances",
    )

    audit_logs = relationship(
    "WorkflowAudit",
    back_populates="workflow_instance",
    cascade="all, delete-orphan",
    )