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
# pylint: disable=C,R,W
import datetime
from datetime import timedelta

from flask_appbuilder import Model
from flask_appbuilder.security.sqla.models import User
from sqlalchemy import (
    Boolean, Column, DateTime, Integer, Float, String, UniqueConstraint, ForeignKey, Sequence, Table)
from sqlalchemy.orm import relationship

metadata = Model.metadata  # pylint: disable=no-member


class ResetRequest(Model):
    ___tablename__ = 'reset_request'
    id = Column(Integer, Sequence('reset_request_id_seq'), primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('ab_user.id'))
    email = Column(String(64), nullable=False)
    reset_date = Column(DateTime, default=datetime.datetime.now, nullable=True)
    reset_hash = Column(String(256))
    used = Column(Boolean)


assoc_team_user = Table(
    'team_user', metadata,
    Column('id', Integer, primary_key=True),
    Column('user_id', Integer, ForeignKey('ab_user.id')),
    Column('team_id', Integer, ForeignKey('team.id')),
    UniqueConstraint('user_id', 'team_id')
)


class Team(Model):
    __tablename__ = 'team'
    id = Column(Integer, Sequence('team_id_seq'), primary_key=True, autoincrement=True)
    team_name = Column(String(250))
    users = relationship('SolarBIUser', secondary=assoc_team_user, backref='team')
    date_created = Column(DateTime, default=datetime.datetime.now)

    def __repr__(self):
        return self.team_name


class TeamRegisterUser(Model):
    """ the register model for users who are invited by admin """
    __tablename__ = 'ab_register_user'
    id = Column(Integer, Sequence("ab_register_user_id_seq"), primary_key=True)
    first_name = Column(String(64), nullable=True)
    last_name = Column(String(64), nullable=True)
    username = Column(String(64), unique=True, nullable=False)
    password = Column(String(256))
    email = Column(String(64), nullable=False)
    team = Column(String(250), nullable=False)
    registration_date = Column(DateTime, default=datetime.datetime.now, nullable=True)
    registration_hash = Column(String(256))
    inviter = Column('inviter_id', Integer, ForeignKey('ab_user.id'), nullable=True)
    valid_date = Column(DateTime, default=(lambda: datetime.datetime.now() + timedelta(hours=24)),
                        nullable=True)
    role_assigned = Column('role_id', Integer, ForeignKey('ab_role.id'), nullable=True)


class SolarBIUser(User):
    __tablename__ = 'ab_user'
    email_confirm = Column(Boolean, default=False)
    __table_args__ = {'extend_existing': True}