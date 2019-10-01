# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
"""create SolarBISlice III

Revision ID: ed31009c1532
Revises: 38a0be6d52df
Create Date: 2019-09-25 10:38:40.096349

"""

# revision identifiers, used by Alembic.
revision = 'ed31009c1532'
down_revision = '38a0be6d52df'

from alembic import op
import sqlalchemy as sa


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('solarbi_slices',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('slice_name', sa.String(length=250), nullable=True),
    sa.Column('datasource_id', sa.Integer(), nullable=True),
    sa.Column('datasource_type', sa.String(length=200), nullable=True),
    sa.Column('datasource_name', sa.String(length=2000), nullable=True),
    sa.Column('viz_type', sa.String(length=250), nullable=True),
    sa.Column('query_id', sa.Integer(), nullable=True),
    sa.Column('start_date', sa.DateTime(), nullable=True),
    sa.Column('end_date', sa.DateTime(), nullable=True),
    sa.Column('data_type', sa.String(length=200), nullable=True),
    sa.Column('resolution', sa.String(length=200), nullable=True),
    sa.Column('query_status', sa.String(length=200), nullable=True),
    sa.Column('valid_date', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('solarbislice_user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('solarbislice_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['solarbislice_id'], ['solarbi_slices.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['ab_user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # with op.batch_alter_table('annotation', schema=None) as batch_op:
    #     batch_op.alter_column('layer_id',
    #            existing_type=sa.INTEGER(),
    #            nullable=False)
    #
    # with op.batch_alter_table('clusters', schema=None) as batch_op:
    #     batch_op.add_column(sa.Column('broker_pass', sqlalchemy_utils.types.encrypted.encrypted_type.EncryptedType(), nullable=True))
    #     batch_op.add_column(sa.Column('broker_user', sa.String(length=255), nullable=True))
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.create_unique_constraint(None, ['verbose_name'])
    #
    # with op.batch_alter_table('columns', schema=None) as batch_op:
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.alter_column('column_name',
    #            existing_type=sa.VARCHAR(length=255),
    #            nullable=False)
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #
    # with op.batch_alter_table('css_templates', schema=None) as batch_op:
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #
    # with op.batch_alter_table('dashboard_slices', schema=None) as batch_op:
    #     batch_op.create_unique_constraint(None, ['dashboard_id', 'slice_id'])
    #
    # with op.batch_alter_table('dashboards', schema=None) as batch_op:
    #     batch_op.add_column(sa.Column('published', sa.Boolean(), nullable=True))
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.create_unique_constraint(None, ['slug'])
    #
    # with op.batch_alter_table('datasources', schema=None) as batch_op:
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.alter_column('datasource_name',
    #            existing_type=sa.VARCHAR(length=255),
    #            nullable=False)
    #     batch_op.create_foreign_key(None, 'ab_user', ['created_by_fk'], ['id'])
    #
    # with op.batch_alter_table('dbs', schema=None) as batch_op:
    #     batch_op.alter_column('allow_csv_upload',
    #            existing_type=sa.BOOLEAN(),
    #            nullable=True,
    #            existing_server_default=sa.text('1'))
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.create_unique_constraint(None, ['verbose_name'])
    #
    # with op.batch_alter_table('metrics', schema=None) as batch_op:
    #     batch_op.alter_column('json',
    #            existing_type=sa.TEXT(),
    #            nullable=False)
    #     batch_op.alter_column('metric_name',
    #            existing_type=sa.VARCHAR(length=255),
    #            nullable=False)
    #     batch_op.create_foreign_key(None, 'ab_user', ['created_by_fk'], ['id'])
    #     batch_op.create_foreign_key(None, 'ab_user', ['changed_by_fk'], ['id'])
    #
    # with op.batch_alter_table('query', schema=None) as batch_op:
    #     batch_op.drop_column('limit_used')
    #
    # with op.batch_alter_table('slices', schema=None) as batch_op:
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #
    # with op.batch_alter_table('sql_metrics', schema=None) as batch_op:
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.alter_column('expression',
    #            existing_type=sa.TEXT(),
    #            nullable=False)
    #     batch_op.alter_column('metric_name',
    #            existing_type=sa.VARCHAR(length=512),
    #            nullable=False)
    #     batch_op.create_unique_constraint(None, ['table_id', 'metric_name'])
    #
    # with op.batch_alter_table('table_columns', schema=None) as batch_op:
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.alter_column('column_name',
    #            existing_type=sa.VARCHAR(length=255),
    #            nullable=False)
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.create_unique_constraint(None, ['table_id', 'column_name'])
    #     batch_op.drop_column('database_expression')
    #
    # with op.batch_alter_table('tables', schema=None) as batch_op:
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.drop_constraint('uq_table_in_db_schema', type_='unique')
    #     batch_op.create_unique_constraint(None, ['database_id', 'table_name'])
    #
    # with op.batch_alter_table('url', schema=None) as batch_op:
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    # with op.batch_alter_table('url', schema=None) as batch_op:
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #
    # with op.batch_alter_table('tables', schema=None) as batch_op:
    #     batch_op.drop_constraint(None, type_='unique')
    #     batch_op.create_unique_constraint('uq_table_in_db_schema', ['database_id', 'schema', 'table_name'])
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #
    # with op.batch_alter_table('table_columns', schema=None) as batch_op:
    #     batch_op.add_column(sa.Column('database_expression', sa.VARCHAR(length=255), nullable=True))
    #     batch_op.drop_constraint(None, type_='unique')
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #     batch_op.alter_column('column_name',
    #            existing_type=sa.VARCHAR(length=255),
    #            nullable=True)
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #
    # with op.batch_alter_table('sql_metrics', schema=None) as batch_op:
    #     batch_op.drop_constraint(None, type_='unique')
    #     batch_op.alter_column('metric_name',
    #            existing_type=sa.VARCHAR(length=512),
    #            nullable=True)
    #     batch_op.alter_column('expression',
    #            existing_type=sa.TEXT(),
    #            nullable=True)
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #
    # with op.batch_alter_table('slices', schema=None) as batch_op:
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #
    # with op.batch_alter_table('query', schema=None) as batch_op:
    #     batch_op.add_column(sa.Column('limit_used', sa.BOOLEAN(), nullable=True))
    #
    # with op.batch_alter_table('metrics', schema=None) as batch_op:
    #     batch_op.drop_constraint(None, type_='foreignkey')
    #     batch_op.drop_constraint(None, type_='foreignkey')
    #     batch_op.alter_column('metric_name',
    #            existing_type=sa.VARCHAR(length=255),
    #            nullable=True)
    #     batch_op.alter_column('json',
    #            existing_type=sa.TEXT(),
    #            nullable=True)
    #
    # with op.batch_alter_table('dbs', schema=None) as batch_op:
    #     batch_op.drop_constraint(None, type_='unique')
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #     batch_op.alter_column('allow_csv_upload',
    #            existing_type=sa.BOOLEAN(),
    #            nullable=False,
    #            existing_server_default=sa.text('1'))
    #
    # with op.batch_alter_table('datasources', schema=None) as batch_op:
    #     batch_op.drop_constraint(None, type_='foreignkey')
    #     batch_op.alter_column('datasource_name',
    #            existing_type=sa.VARCHAR(length=255),
    #            nullable=True)
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #
    # with op.batch_alter_table('dashboards', schema=None) as batch_op:
    #     batch_op.drop_constraint(None, type_='unique')
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #     batch_op.drop_column('published')
    #
    # with op.batch_alter_table('dashboard_slices', schema=None) as batch_op:
    #     batch_op.drop_constraint(None, type_='unique')
    #
    # with op.batch_alter_table('css_templates', schema=None) as batch_op:
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #
    # with op.batch_alter_table('columns', schema=None) as batch_op:
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #     batch_op.alter_column('column_name',
    #            existing_type=sa.VARCHAR(length=255),
    #            nullable=True)
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #
    # with op.batch_alter_table('clusters', schema=None) as batch_op:
    #     batch_op.drop_constraint(None, type_='unique')
    #     batch_op.alter_column('created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #     batch_op.alter_column('changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    #     batch_op.drop_column('broker_user')
    #     batch_op.drop_column('broker_pass')
    #
    # with op.batch_alter_table('annotation', schema=None) as batch_op:
    #     batch_op.alter_column('layer_id',
    #            existing_type=sa.INTEGER(),
    #            nullable=True)

    op.drop_table('solarbislice_user')
    op.drop_table('solarbi_slices')
    # ### end Alembic commands ###
