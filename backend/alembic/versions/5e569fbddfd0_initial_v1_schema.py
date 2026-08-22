"""initial v1 schema

Revision ID: 5e569fbddfd0
Revises:
Create Date: 2026-08-22
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa 
from sqlalchemy.dialects import postgresql


revision: str = "5e569fbddfd0"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create the initial Mini-CEO schema."""

    # ---------------------------------
    # Companies
    # ---------------------------------
    op.create_table(
        "companies",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("industry", sa.String(length=100), nullable=True),
        sa.Column("country", sa.String(length=100), nullable=True),
    )

    # ---------------------------------
    # Users
    # ---------------------------------
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("full_name", sa.String(length=255), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("password", sa.String(length=255), nullable=False),
        sa.Column("role", sa.String(length=50), nullable=False),
        sa.Column("designation", sa.String(length=100), nullable=False),
        sa.Column(
            "company_id",
            sa.Integer(),
            sa.ForeignKey("companies.id"),
            nullable=False,
        ),
        sa.Column("is_active", sa.Boolean(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )

    # ---------------------------------
    # Departments
    # ---------------------------------
    op.create_table(
        "departments",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("description", sa.String(length=255), nullable=True),
        sa.Column(
            "company_id",
            sa.Integer(),
            sa.ForeignKey("companies.id"),
            nullable=False,
        ),
    )

    # ---------------------------------
    # Employees
    # ---------------------------------
    # department_id and team_id are intentionally
    # added by later migrations.
    op.create_table(
        "employees",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("employee_code", sa.String(), nullable=False),
        sa.Column("full_name", sa.String(), nullable=False),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("phone", sa.String(), nullable=False),
        sa.Column("designation", sa.String(), nullable=False),
        sa.Column(
            "company_id",
            sa.Integer(),
            sa.ForeignKey("companies.id"),
            nullable=False,
        ),
        sa.Column("manager_id", sa.Integer(), nullable=True),
        sa.Column("joining_date", sa.Date(), nullable=False),
        sa.Column("salary", sa.Numeric(10, 2), nullable=False),
        sa.Column("status", sa.String(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )

    # Self-referencing employee hierarchy.
    op.create_foreign_key(
        "fk_employee_manager",
        "employees",
        "employees",
        ["manager_id"],
        ["id"],
    )

    # ---------------------------------
    # Conversations
    # ---------------------------------
    op.create_table(
        "conversations",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column(
            "company_id",
            sa.Integer(),
            sa.ForeignKey("companies.id"),
            nullable=False,
        ),
        sa.Column(
            "user_id",
            sa.Integer(),
            sa.ForeignKey("users.id"),
            nullable=False,
        ),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
    )

    # ---------------------------------
    # Messages
    # ---------------------------------
    op.create_table(
        "messages",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column(
            "conversation_id",
            sa.Integer(),
            sa.ForeignKey("conversations.id"),
            nullable=False,
        ),
        sa.Column("role", sa.String(length=20), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )

    # ---------------------------------
    # Conversation memories
    # ---------------------------------
    op.create_table(
        "conversation_memories",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column(
            "company_id",
            sa.Integer(),
            sa.ForeignKey("companies.id"),
            nullable=False,
        ),
        sa.Column(
            "user_id",
            sa.Integer(),
            sa.ForeignKey("users.id"),
            nullable=False,
        ),
        sa.Column("role", sa.Text(), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )

    # ---------------------------------
    # Documents
    # ---------------------------------
    op.create_table(
        "documents",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column(
            "company_id",
            sa.Integer(),
            sa.ForeignKey("companies.id"),
            nullable=False,
        ),
        sa.Column(
            "uploaded_by",
            sa.Integer(),
            sa.ForeignKey("users.id"),
            nullable=False,
        ),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("file_name", sa.String(length=255), nullable=False),
        sa.Column("file_type", sa.String(length=50), nullable=False),
        sa.Column("file_size", sa.Integer(), nullable=False),
        sa.Column("storage_path", sa.String(length=500), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )

    # ---------------------------------
    # Document chunks
    # ---------------------------------
    op.create_table(
        "document_chunks",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column(
            "embedding",
            postgresql.JSONB(),
            nullable=True,
            ),
        sa.Column(
            "document_id",
            sa.Integer(),
            sa.ForeignKey("documents.id"),
            nullable=False,
        ),
        sa.Column("chunk_index", sa.Integer(), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )


def downgrade() -> None:
    """Drop the initial Mini-CEO schema."""

    op.drop_table("document_chunks")
    op.drop_table("documents")
    op.drop_table("conversation_memories")
    op.drop_table("messages")
    op.drop_table("conversations")

    op.drop_constraint(
        "fk_employee_manager",
        "employees",
        type_="foreignkey",
    )

    op.drop_table("employees")
    op.drop_table("departments")
    op.drop_table("users")
    op.drop_table("companies")