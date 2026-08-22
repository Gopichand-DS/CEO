"""add documents created_at default"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "44e6ec3a10d3"
down_revision: Union[str, Sequence[str], None] = "8cc22339ed91"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add database default for documents.created_at."""

    op.alter_column(
        "documents",
        "created_at",
        existing_type=sa.DateTime(),
        server_default=sa.text("now()"),
        existing_nullable=True,
    )


def downgrade() -> None:
    """Remove database default from documents.created_at."""

    op.alter_column(
        "documents",
        "created_at",
        existing_type=sa.DateTime(),
        server_default=None,
        existing_nullable=True,
    )