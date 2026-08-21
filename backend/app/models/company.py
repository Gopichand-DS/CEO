from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database.database import Base


class Company(Base):

    __tablename__ = "companies"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    name = Column(
        String(255),
        nullable=False,
    )

    industry = Column(
        String(100),
    )

    country = Column(
        String(100),
    )

    users = relationship(
        "User",
        back_populates="company",
    )

    teams = relationship(
        "Team",
        back_populates="company",
        cascade="all, delete-orphan",
    )

    employees = relationship(
        "Employee",
        back_populates="company",
        cascade="all, delete-orphan",
    )

    departments = relationship(
        "Department",
        back_populates="company",
        cascade="all, delete-orphan",
    )

    projects = relationship(
        "Project",
        back_populates="company",
        cascade="all, delete-orphan",
    )

    tasks = relationship(
        "Task",
        back_populates="company",
    )

    workflows = relationship(
        "Workflow",
        back_populates="company",
        cascade="all, delete-orphan",
    )

    conversations = relationship(
        "Conversation",
        back_populates="company",
        cascade="all, delete-orphan",
    )

    finances = relationship(
        "Finance",
        back_populates="company",
        cascade="all, delete-orphan",
    )

    conversation_memories = relationship(
        "ConversationMemory",
        back_populates="company",
        cascade="all, delete-orphan",
    )

    documents = relationship(
        "Document",
        back_populates="company",
        cascade="all, delete-orphan",
    )

    notifications = relationship(
    "Notification",
    back_populates="company",
    cascade="all, delete-orphan",
    )