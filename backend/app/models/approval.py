from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class Approval(Base):
    __tablename__ = "approvals"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    company_id = Column(
        Integer,
        ForeignKey("companies.id"),
        nullable=False,
    )

    title = Column(
        String(200),
        nullable=False,
    )

    approval_type = Column(
        String(50),
        nullable=False,
    )

    requested_by = Column(
        Integer,
        ForeignKey("employees.id"),
        nullable=False,
    )

    approved_by = Column(
        Integer,
        ForeignKey("employees.id"),
        nullable=True,
    )

    status = Column(
        String(30),
        default="PENDING",
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    approved_at = Column(
        DateTime(timezone=True),
        nullable=True,
    )

    company = relationship("Company")

    requester = relationship(
        "Employee",
        foreign_keys=[requested_by],
    )

    approver = relationship(
        "Employee",
        foreign_keys=[approved_by],
    )