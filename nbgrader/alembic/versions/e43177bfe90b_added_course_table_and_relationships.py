"""Added course table and relationships

Revision ID: e43177bfe90b
Revises: 167914646830
Create Date: 2019-05-30 09:39:31.881296

"""
from alembic import op
import sqlalchemy as sa
from nbgrader.api import Course

# revision identifiers, used by Alembic.
revision = 'e43177bfe90b'
down_revision = '167914646830'
branch_labels = None
depends_on = None


def upgrade():
    """
    This migrations adds a course column to the assignment table
    and a matching foreign key into the course table
    """

    default_course = "default_course"

    with op.batch_alter_table("assignment") as batch_op:

        batch_op.add_column(sa.Column(
            'course_id', sa.VARCHAR(128), nullable=True, default=default_course))


def downgrade():
    with op.batch_alter_table("assignment") as batch_op:

        batch_op.drop_column('assignment', 'course_id')
