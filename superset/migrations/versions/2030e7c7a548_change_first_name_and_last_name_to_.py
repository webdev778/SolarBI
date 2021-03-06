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
"""change first_name and last_name to nullable

Revision ID: 2030e7c7a548
Revises: 64f20a6c5685
Create Date: 2019-09-11 14:12:46.897494

"""

# revision identifiers, used by Alembic.
revision = '2030e7c7a548'
down_revision = '64f20a6c5685'

from alembic import op
import sqlalchemy as sa


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('ab_register_user', 'first_name',
               existing_type=sa.VARCHAR(length=64),
               nullable=True)
    op.alter_column('ab_register_user', 'last_name',
               existing_type=sa.VARCHAR(length=64),
               nullable=True)
    # op.alter_column('annotation', 'layer_id',
    #            existing_type=sa.INTEGER(),
    #            nullable=False)
    # op.add_column('clusters', sa.Column('broker_pass', sqlalchemy_utils.types.encrypted.encrypted_type.EncryptedType(), nullable=True))
    # op.add_column('clusters', sa.Column('broker_user', sa.String(length=255), nullable=True))
    # op.alter_column('clusters', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.alter_column('clusters', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.create_unique_constraint(None, 'clusters', ['verbose_name'])
    # op.alter_column('columns', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.alter_column('columns', 'column_name',
    #            existing_type=sa.VARCHAR(length=255),
    #            nullable=False)
    # op.alter_column('columns', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.alter_column('css_templates', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.alter_column('css_templates', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.create_unique_constraint(None, 'dashboard_slices', ['dashboard_id', 'slice_id'])
    # op.add_column('dashboards', sa.Column('published', sa.Boolean(), nullable=True))
    # op.alter_column('dashboards', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.alter_column('dashboards', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.create_unique_constraint(None, 'dashboards', ['slug'])
    # op.alter_column('datasources', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.alter_column('datasources', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.alter_column('datasources', 'datasource_name',
    #            existing_type=sa.VARCHAR(length=255),
    #            nullable=False)
    # op.create_foreign_key(None, 'datasources', 'ab_user', ['created_by_fk'], ['id'])
    # op.alter_column('dbs', 'allow_csv_upload',
    #            existing_type=sa.BOOLEAN(),
    #            nullable=True,
    #            existing_server_default=sa.text('1'))
    # op.alter_column('dbs', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.alter_column('dbs', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.create_unique_constraint(None, 'dbs', ['verbose_name'])
    # op.alter_column('metrics', 'json',
    #            existing_type=sa.TEXT(),
    #            nullable=False)
    # op.alter_column('metrics', 'metric_name',
    #            existing_type=sa.VARCHAR(length=255),
    #            nullable=False)
    # op.create_foreign_key(None, 'metrics', 'ab_user', ['changed_by_fk'], ['id'])
    # op.create_foreign_key(None, 'metrics', 'ab_user', ['created_by_fk'], ['id'])
    # op.drop_column('query', 'limit_used')
    # op.alter_column('slices', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.alter_column('slices', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.alter_column('sql_metrics', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.alter_column('sql_metrics', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.alter_column('sql_metrics', 'expression',
    #            existing_type=sa.TEXT(),
    #            nullable=False)
    # op.alter_column('sql_metrics', 'metric_name',
    #            existing_type=sa.VARCHAR(length=512),
    #            nullable=False)
    # op.create_unique_constraint(None, 'sql_metrics', ['table_id', 'metric_name'])
    # op.alter_column('table_columns', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.alter_column('table_columns', 'column_name',
    #            existing_type=sa.VARCHAR(length=255),
    #            nullable=False)
    # op.alter_column('table_columns', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.create_unique_constraint(None, 'table_columns', ['table_id', 'column_name'])
    # op.drop_column('table_columns', 'database_expression')
    # op.alter_column('tables', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.alter_column('tables', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.drop_constraint('uq_table_in_db_schema', 'tables', type_='unique')
    # op.create_unique_constraint(None, 'tables', ['database_id', 'table_name'])
    # op.alter_column('url', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # op.alter_column('url', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    # op.alter_column('url', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.alter_column('url', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.drop_constraint(None, 'tables', type_='unique')
    # op.create_unique_constraint('uq_table_in_db_schema', 'tables', ['database_id', 'schema', 'table_name'])
    # op.alter_column('tables', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.alter_column('tables', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.add_column('table_columns', sa.Column('database_expression', sa.VARCHAR(length=255), nullable=True))
    # op.drop_constraint(None, 'table_columns', type_='unique')
    # op.alter_column('table_columns', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.alter_column('table_columns', 'column_name',
    #            existing_type=sa.VARCHAR(length=255),
    #            nullable=True)
    # op.alter_column('table_columns', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.drop_constraint(None, 'sql_metrics', type_='unique')
    # op.alter_column('sql_metrics', 'metric_name',
    #            existing_type=sa.VARCHAR(length=512),
    #            nullable=True)
    # op.alter_column('sql_metrics', 'expression',
    #            existing_type=sa.TEXT(),
    #            nullable=True)
    # op.alter_column('sql_metrics', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.alter_column('sql_metrics', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.alter_column('slices', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.alter_column('slices', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.add_column('query', sa.Column('limit_used', sa.BOOLEAN(), nullable=True))
    # op.drop_constraint(None, 'metrics', type_='foreignkey')
    # op.drop_constraint(None, 'metrics', type_='foreignkey')
    # op.alter_column('metrics', 'metric_name',
    #            existing_type=sa.VARCHAR(length=255),
    #            nullable=True)
    # op.alter_column('metrics', 'json',
    #            existing_type=sa.TEXT(),
    #            nullable=True)
    # op.drop_constraint(None, 'dbs', type_='unique')
    # op.alter_column('dbs', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.alter_column('dbs', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.alter_column('dbs', 'allow_csv_upload',
    #            existing_type=sa.BOOLEAN(),
    #            nullable=False,
    #            existing_server_default=sa.text('1'))
    # op.drop_constraint(None, 'datasources', type_='foreignkey')
    # op.alter_column('datasources', 'datasource_name',
    #            existing_type=sa.VARCHAR(length=255),
    #            nullable=True)
    # op.alter_column('datasources', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.alter_column('datasources', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.drop_constraint(None, 'dashboards', type_='unique')
    # op.alter_column('dashboards', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.alter_column('dashboards', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.drop_column('dashboards', 'published')
    # op.drop_constraint(None, 'dashboard_slices', type_='unique')
    # op.alter_column('css_templates', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.alter_column('css_templates', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.alter_column('columns', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.alter_column('columns', 'column_name',
    #            existing_type=sa.VARCHAR(length=255),
    #            nullable=True)
    # op.alter_column('columns', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.drop_constraint(None, 'clusters', type_='unique')
    # op.alter_column('clusters', 'created_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.alter_column('clusters', 'changed_on',
    #            existing_type=sa.DATETIME(),
    #            nullable=False)
    # op.drop_column('clusters', 'broker_user')
    # op.drop_column('clusters', 'broker_pass')
    # op.alter_column('annotation', 'layer_id',
    #            existing_type=sa.INTEGER(),
    #            nullable=True)
    op.alter_column('ab_register_user', 'last_name',
               existing_type=sa.VARCHAR(length=64),
               nullable=False)
    op.alter_column('ab_register_user', 'first_name',
               existing_type=sa.VARCHAR(length=64),
               nullable=False)
    # ### end Alembic commands ###
