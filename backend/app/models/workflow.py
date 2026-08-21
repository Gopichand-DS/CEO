from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base


class Workflow(Base):
    __tablename__ = "workflows"

    id = Column(Integer, primary_key=True, index=True)

    workflow_code = Column(String(50), unique=True, nullable=False, index=True)
    workflow_name = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)

    company_id = Column(
        Integer,
        ForeignKey("companies.id", ondelete="CASCADE"),
        nullable=False,
    )

    is_active = Column(Boolean, default=True)

    company = relationship("Company", back_populates="workflows")

    steps = relationship(
    "WorkflowStep",
    back_populates="workflow",
    cascade="all, delete-orphan",
    order_by="WorkflowStep.step_order",
    )
    instances = relationship(
    "WorkflowInstance",
    back_populates="workflow",
    cascade="all, delete-orphan",
    )