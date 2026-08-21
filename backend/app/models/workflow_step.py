from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database.database import Base


class WorkflowStep(Base):
    __tablename__ = "workflow_steps"

    id = Column(Integer, primary_key=True, index=True)

    workflow_id = Column(
        Integer,
        ForeignKey("workflows.id", ondelete="CASCADE"),
        nullable=False,
    )

    step_order = Column(Integer, nullable=False)

    step_name = Column(String(150), nullable=False)

    description = Column(Text, nullable=True)

    is_required = Column(Boolean, default=True)

    workflow = relationship(
        "Workflow",
        back_populates="steps",
    )