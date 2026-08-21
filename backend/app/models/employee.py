from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DateTime,
    ForeignKey,
    Numeric,
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.models.department import Department
from app.database.database import Base

class Employee(Base):
    __tablename__ = "employees"
    id = Column(
    Integer,
    primary_key=True,
    index=True,
    autoincrement=True,
    )
    employee_code = Column(
    String,
    unique=True,
    nullable=False,
    )
    full_name = Column(
    String,
    nullable=False,
    )
    email = Column(
    String,
    unique=True,
    nullable=False,
    )
    phone = Column(
    String,
    unique=True,
    nullable=False,
    )
    designation = Column(
    String,
    nullable=False,
    )
    company_id = Column(
    Integer,
    ForeignKey("companies.id"),
    nullable=False,
    )
    department_id = Column(
    Integer,
    ForeignKey("departments.id"),
    nullable=False,
    )
    manager_id = Column(
    Integer,
    ForeignKey("employees.id"),
    nullable=True,
    )
    joining_date = Column(
    Date,
    nullable=False,
    )
    salary = Column(
    Numeric(10, 2),
    nullable=False,
    )
    status = Column(
    String,
    default="ACTIVE",
    nullable=False,
    )
    created_at = Column(
    DateTime(timezone=True),
    server_default=func.now(),
    )
    company = relationship(
    "Company",
    back_populates="employees",
    )
    department = relationship(
    "Department",
    back_populates="employees",
    )
    manager = relationship(
    "Employee",
    remote_side=[id],
    )
    team = relationship(
    "Team",
    back_populates="employees",
    )
    team_id = Column(
    Integer,
    ForeignKey("teams.id", ondelete="SET NULL"),
    nullable=True,
    )
    tasks = relationship(
    "Task",
    foreign_keys="Task.assigned_to",
    back_populates="assignee",
    )
    workflow_instances = relationship(
    "WorkflowInstance",
    back_populates="employee",
    cascade="all, delete-orphan",
    )
    # requested_approvals = relationship(
    # "Approval",
    # foreign_keys="Approval.requested_by",
    # )

    # approved_approvals = relationship(
    #       "Approval",
    #    foreign_keys="Approval.approved_by",
    # )