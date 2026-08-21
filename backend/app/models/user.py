from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(255), nullable=False)

    email = Column(String(255), unique=True, index=True, nullable=False)

    password = Column(String(255), nullable=False)

    role = Column(String(50), nullable=False, default="MANAGER")

    designation = Column(String(100),nullable=False,default="Employee")

    company_id = Column(
        Integer,
        ForeignKey("companies.id"),
        nullable=False,
    )

    is_active = Column(Boolean, default=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    company = relationship(
        "Company",
        back_populates="users",
    )
    conversations = relationship(
    "Conversation",
    back_populates="user",
    cascade="all, delete-orphan",
    )
    conversation_memories = relationship(
    "ConversationMemory",
    back_populates="user",
    cascade="all, delete-orphan",
    )
    documents = relationship(
    "Document",
    back_populates="uploader",
    cascade="all, delete-orphan"
    )
    notifications = relationship(
    "Notification",
    back_populates="user",
    cascade="all, delete-orphan",
    )