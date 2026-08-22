"""create finances table

Revision ID: d9f23d6faae5
Revises: ae54f4a87bf8
Create Date: 2026-08-04 10:30:17.488160

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "d9f23d6faae5"
down_revision: Union[str, Sequence[str], None] = "ae54f4a87bf8"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create finances table."""

    op.create_table(
        "finances",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("company_id", sa.Integer(), nullable=False),
        sa.Column(
            "transaction_type",
            sa.String(length=30),
            nullable=False,
        ),
        sa.Column(
            "category",
            sa.String(length=100),
            nullable=False,
        ),
        sa.Column(
            "description",
            sa.String(length=255),
            nullable=True,
        ),
        sa.Column(
            "amount",
            sa.Numeric(precision=12, scale=2),
            nullable=False,
        ),
        sa.Column(
            "transaction_date",
            sa.Date(),
            nullable=False,
        ),
        sa.Column(
            "status",
            sa.String(length=30),
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=True,
        ),
        sa.ForeignKeyConstraint(
            ["company_id"],
            ["companies.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        op.f("ix_finances_id"),
        "finances",
        ["id"],
        unique=False,
    )


def downgrade() -> None:
    """Drop finances table."""

    op.drop_index(
        op.f("ix_finances_id"),
        table_name="finances",
    )

    op.drop_table("finances")