from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database.database import Base


class WorkflowAudit(Base):
    __tablename__ = "workflow_audits"

    id = Column(Integer, primary_key=True, index=True)

    workflow_instance_id = Column(
        Integer,
        ForeignKey(
            "workflow_instances.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    action = Column(
        String(50),
        nullable=False,
    )

    remarks = Column(
        Text,
        nullable=True,
    )

    performed_by = Column(
        String(100),
        nullable=False,
    )

    performed_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    workflow_instance = relationship(
        "WorkflowInstance",
        back_populates="audit_logs",
    )