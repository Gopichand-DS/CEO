from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base


class Department(Base):
    __tablename__ = "departments"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
        autoincrement=True,
    )

    name = Column(
        String(100),
        nullable=False,
    )

    description = Column(
        String(255),
        nullable=True,
    )

    company_id = Column(
        Integer,
        ForeignKey("companies.id"),
        nullable=False,
    )

    company = relationship(
        "Company",
        back_populates="departments",
    )

    teams = relationship(
    "Team",
    back_populates="department",
    cascade="all, delete-orphan",
    )
    
    employees = relationship(
    "Employee",
    back_populates="department",
    )
    projects = relationship(
    "Project",
    back_populates="department",
    cascade="all, delete-orphan",
    )
    