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
import logging
import random
import string
import uuid

from flask import url_for
from flask_appbuilder import const, urltools
from flask_appbuilder.models.sqla.interface import SQLAInterface
from werkzeug.security import generate_password_hash, check_password_hash

from superset.solar.views import SolarBIPasswordRecoverView, SolarBIAuthDBView, \
    SolarBIResetPasswordView, SolarBIUserInfoEditView, SolarBIResetMyPasswordView
from superset.solar.registerviews import (
    SolarBIRegisterUserDBView, SolarBIRegisterInvitationView,
    SolarBIRegisterInvitationUserDBView
)
from superset.solar.models import ResetRequest, Team, TeamRegisterUser, SolarBIUser
from superset.security import SupersetSecurityManager

PERMISSION_COMMON = {
    'can_add', 'can_list', 'can_show', 'can_edit', 'can_invitation', 'can_invitation_post'
}

NOT_ALLOWED_SQL_PERM = {
    'can_sql_json', 'can_csv', 'can_search_queries', 'can_sqllab_viz',
    'can_sqllab',
}

OWNER_NOT_ALLOWED_MENU = {
    'List Users', 'List Roles', 'Base Permissions', 'Views/Menus',
    'Permission on Views/Menus', 'Action Log',
    'Manage', 'Druid Clusters', 'Druid Datasources',
    'Scan New Datasources', 'Refresh Druid Metadata',
    'SQL Lab',
}

# OWNER_PERMISSION_MODEL = {
#     'UserDBModelView',
#     'DatabaseView',
#     'SliceModelView',
#     'SliceAddView',
#     'TableModelView',
#     # 'DashboardModelView',
#     # 'DashboardAddView',
#     'SolarBIModelAddView',
#     'SolarBIModelWelcomeView',
#     'SolarBIModelView',
#     'SolarBIRegisterInvitationUserDBView',
#     'SolarBIRegisterUserModelView',
#     'SolarBIUserStatsChartView',
#     'SolarBIUserInfoEditView',
#     'SolarBIResetMyPasswordView',
# }

# OWNER_NOT_ALLOWED_PERM_MENU = {
#     'SavvySiteModelView': ['can_add', 'can_delete'],
#     'UserDBModelView': ['can_list', 'can_add', 'can_edit', 'can_delete'],
#     'RegisterUserModelView': ['can_list'],
#     'LogModelView': ['can_list', 'can_download', 'can_edit', 'can_show', 'can_delete', 'can_add'],
#     'RoleModelView': ['can_list', 'can_download', 'can_edit', 'can_show', 'can_delete', 'can_add'],
#     'DashboardModelView': ['can_list', 'can_download', 'can_edit', 'can_show', 'can_delete', 'can_add'],
# }

OWNER_PERMISSION_MENU = {
    'SolarBI', 'Search your Location', 'Saved Solar Data', 'Introduction'
}

OWNER_INVITE_ROLES = {
    'solar_default',
}

OWNER_PERMISSIONS_VIEWS = [
    ('can_explore_json', 'Superset'),
    ('resetmypassword', 'UserDBModelView'),
    ('can_this_form_post', 'ResetMyPasswordView'),
    ('can_this_form_get', 'ResetMyPasswordView'),
    ('can_this_form_post', 'UserInfoEditView'),
    ('can_this_form_get', 'UserInfoEditView'),
    ('can_this_form_post', 'SolarBIUserInfoEditView'),
    ('can_this_form_get', 'SolarBIUserInfoEditView'),
    ('can_this_form_post', 'SolarBIResetMyPasswordView'),
    ('can_this_form_get', 'SolarBIResetMyPasswordView'),
    # ('can_userinfo', 'UserDBModelView'),
    ('userinfoedit', 'UserDBModelView'),
    ('can_invitation', 'SolarBIRegisterInvitationUserDBView'),
    ('can_invitation_post', 'SolarBIRegisterInvitationUserDBView'),
]
OWNER_PERMISSIONS_COMMON = ['can_show', 'can_list', 'can_delete', 'can_add']
OWNER_PERMISSIONS_VIEW = ['SolarBIModelAddView', 'SolarBIModelWelcomeView',
                          'SolarBIModelView']

# SUPERUSER_INVITE_ROLES = {
#     'org_user', 'org_viewer',
# }

# USER_NOT_ALLOWED = {
#     'Druid Clusters', 'Druid Datasources', 'Scan New Datasources', 'SavvyRegisterInvitationUserDBView',
#     'SavvyGroupModelView', 'List Group', 'SavvySiteModelView',
# }

# VIEWER_NOT_ALLOWED = {
#     'Sources',
# }

DB_ROLE_PREFIX = 'team_db_'


class CustomSecurityManager(SupersetSecurityManager):
    passwordrecoverview = SolarBIPasswordRecoverView()
    passwordresetview = SolarBIResetPasswordView()
    invite_register_view = SolarBIRegisterInvitationView()
    invitation_view = SolarBIRegisterInvitationUserDBView()

    registeruserdbview = SolarBIRegisterUserDBView
    authdbview = SolarBIAuthDBView
    registeruser_model = TeamRegisterUser
    # userdbmodelview = SolarBIUserDBModelView
    userinfoeditview = SolarBIUserInfoEditView
    resetmypasswordview = SolarBIResetMyPasswordView

    resetRequest_model = ResetRequest
    team_model = Team
    user_model = SolarBIUser

    def __init__(self, appbuilder):
        super(CustomSecurityManager, self).__init__(appbuilder)

    def register_views(self):
        super(CustomSecurityManager, self).register_views()
        self.appbuilder.add_view_no_menu(self.passwordrecoverview)
        self.appbuilder.add_view_no_menu(self.passwordresetview)
        self.appbuilder.add_view_no_menu(self.invite_register_view)
        self.appbuilder.add_view_no_menu(self.invitation_view)

    def sync_role_definitions(self):
        """Inits the Superset application with security roles and such"""
        from superset import conf
        logging.info('Syncing role definition')

        self.create_custom_permissions()

        # Creating default roles
        self.set_role("Admin", self._is_admin_pvm)
        self.set_role("Alpha", self._is_alpha_pvm)
        self.set_role("Gamma", self._is_gamma_pvm)
        self.set_role("granter", self.is_granter_pvm)
        self.set_role("sql_lab", self._is_sql_lab_pvm)
        self.set_role("solar_default", self.is_solar_pvm)
        self.set_role('team_owner', self.is_owner_pvm)

        if conf.get('PUBLIC_ROLE_LIKE_GAMMA', False):
            self.set_role('Public', self._is_gamma_pvm)

        self.create_missing_perms()
        # commit role and view menu updates
        self.get_session.commit()
        self.clean_perms()

    def is_owner_pvm(self, pvm):
        result = False
        for item in OWNER_PERMISSIONS_VIEWS:
            result = result or (pvm.view_menu.name == item[1] and
                                pvm.permission.name == item[0])
        for permission in OWNER_PERMISSIONS_COMMON:
            for view in OWNER_PERMISSIONS_VIEW:
                result = result or (pvm.view_menu.name == view and
                                    pvm.permission.name == permission)
        # for menu in SOLAR_PERMISSIONS_MENU:
        #     result = result or (pvm.view_menu.name == menu and
        #                         pvm.permission.name == 'menu_access')
        return result

    # def is_owner_pvm(self, pvm):
    #     # print(pvm.view_menu.name)
    #     result = self._is_gamma_pvm(pvm)
    #
    #     for permission in PERMISSION_COMMON:
    #         for view in OWNER_PERMISSION_MODEL:
    #             result = result or (pvm.view_menu.name == view and
    #                                 pvm.permission.name == permission)
    #     result = result or (pvm.view_menu.name not in OWNER_NOT_ALLOWED_MENU)
    #     if pvm.view_menu.name in OWNER_NOT_ALLOWED_MENU or pvm.permission.name in NOT_ALLOWED_SQL_PERM:
    #         return False
    #     if self._is_user_defined_permission(pvm) or pvm.permission.name == 'all_database_access'\
    #             or pvm.permission.name == 'all_datasource_access':
    #         return False
    #     if pvm.view_menu.name in OWNER_NOT_ALLOWED_PERM_MENU \
    #             and pvm.permission.name in OWNER_NOT_ALLOWED_PERM_MENU[pvm.view_menu.name]:
    #         return False
    #     return result

    @property
    def get_url_for_recover(self):
        return url_for('%s.%s' % (self.passwordrecoverview.endpoint,
                                  self.passwordrecoverview.default_view))

    def get_url_for_reset(self, token):
        return url_for('%s.%s' % (self.passwordresetview.endpoint,
                                  self.passwordresetview.default_view), token=token)

    def add_reset_request(self, email):
        """try look for not used existed hash for user"""
        reset_request = self.get_session.query(self.resetRequest_model) \
            .filter_by(email=email, used=False).first()
        if reset_request is not None:
            self.set_token_used(reset_request.reset_hash)
        reset_request = self.resetRequest_model()
        reset_request.email = email
        reset_request.used = False
        user = self.find_user(email=email)

        if user is not None:
            reset_request.user_id = user.id
            hash_token = generate_password_hash(email)
            reset_request.reset_hash = hash_token
            try:
                self.get_session.add(reset_request)
                self.get_session.commit()
                return hash_token
            except Exception as e:
                self.appbuilder.get_session.rollback()
        return None

    def get_url_for_invitation(self, token):
        return url_for('%s.%s' % (self.invite_register_view.endpoint,
                                  'invitation'), invitation_hash=token, _external=True)

    def find_user_by_token(self, token):
        reset_request = self.get_session.query(self.resetRequest_model)\
            .filter_by(reset_hash=token, used=False).first()
        if reset_request is not None:
            time = reset_request.reset_date
            current_time = datetime.datetime.now()
            time_diff = (current_time - time).total_seconds()
            if time_diff < 3600:
                """Check time diff of reset hash time"""
                email = reset_request.email
                user = self.find_user(email=email)
                return user
        return None

    def set_token_used(self, token):
        reset_request = self.get_session.query(self.resetRequest_model) \
            .filter_by(reset_hash=token).first()
        reset_request.used = True
        try:
            self.get_session.merge(reset_request)
            self.get_session.commit()
        except Exception as e:
            self.get_session.rollback()

    def add_team(self, reg, user):
        new_team = self.team_model()
        new_team.team_name = reg.team
        new_team.date_created = reg.registration_date
        new_team.users.append(user)
        try:
            self.get_session.add(new_team)
            self.get_session.commit()
            self.get_session.merge(user)
            self.get_session.commit()
            return new_team
        except Exception as e:
            logging.error(const.LOGMSG_ERR_SEC_ADD_REGISTER_USER.format(str(e)))
            self.appbuilder.get_session.rollback()
            return None

    def find_team(self, team_name=None, user_id=None):
        if team_name:
            return self.get_session.query(self.team_model).filter_by(team_name=team_name).first()
        elif user_id:
            return self.get_session.query(self.team_model).\
                filter(self.team_model.users.any(id=user_id)).scalar()

    def add_team_user(self, email, first_name, last_name, username, hashed_password, team, role_id):
        try:
            team = self.find_team(team)
            user = self.user_model()
            user.email = email
            user.username = username
            user.first_name = first_name
            user.last_name = last_name
            user.active = True
            user.email_confirm = True
            user.password = hashed_password
            role = self.get_session.query(self.role_model).filter_by(id=role_id).first()
            user.roles.append(role)
            if team is not None:
                team.users.append(user)
                # db_role = self.find_role(DB_ROLE_PREFIX+team.team_name)
                # user.roles.append(db_role)
            self.get_session.add(user)
            self.get_session.commit()
            return user
        except Exception as e:
            logging.error(e)
            return False

    # def delete_team(self, team):
    #     from superset.models.core import Database
    #     from superset.connectors.sqla.models import SqlaTable
    #     try:
    #         self.get_session.delete(team)
    #         database = self.get_session.query(Database).\
    #             filter_by(database_name=team.team_name).first()
    #         if database:
    #             role = self.get_session.query(self.role_model).\
    #                 filter_by(name=DB_ROLE_PREFIX+team.organization_name).first()
    #             tables = self.get_session.query(SqlaTable).\
    #                          filter_by(database_id=database.id).all() or []
    #             for table in tables:
    #                 self.get_session.delete(table)
    #             self.get_session.delete(database)
    #             self.get_session.delete(role)
    #         register = self.get_session.query(self.registeruser_model).\
    #             filter_by(team=team.team_name).all()
    #         if register:
    #             for item in register:
    #                 self.get_session.delete(item)
    #         self.get_session.commit()
    #     except Exception as e:
    #         self.get_session.rollback()

    def add_register_user_team_admin(self, **kwargs):
        register_user = self.registeruser_model()
        register_user.first_name = kwargs['first_name']
        register_user.last_name = kwargs['last_name']
        register_user.username = kwargs['username']
        register_user.email = kwargs['email']
        register_user.team = kwargs['team']
        register_user.password = generate_password_hash(kwargs['password'])
        register_user.registration_hash = str(uuid.uuid1())
        try:
            self.get_session.add(register_user)
            self.get_session.commit()
            return register_user
        except Exception as e:
            logging.error(const.LOGMSG_ERR_SEC_ADD_REGISTER_USER.format(str(e)))
            self.appbuilder.get_session.rollback()
            return None

    def find_invite_hash(self, invitation_hash):
        try:
            reg_user = self.find_register_user(invitation_hash)
            team_name = reg_user.team

            inviter = self.get_user_by_id(reg_user.inviter)
            inviter = inviter.get_full_name()
            email = reg_user.email
            role = self.get_session.query(self.role_model).filter_by(id=reg_user.role_assigned).first()
            if datetime.datetime.now() > reg_user.valid_date:
                raise Exception("Invitation link expired")
            if reg_user.first_name is not None:
                raise Exception("Invitation link already used")
            return team_name, inviter, email, role.name
        except Exception as e:
            logging.error(e)
            return None, None, None, None

    def edit_invite_register_user_by_hash(self, invitation_hash, first_name=None, last_name=None, username=None,
                                          password='', hashed_password=''):
        invited_user = self.find_register_user(invitation_hash)
        if first_name:
            invited_user.first_name = first_name
        if last_name:
            invited_user.last_name = last_name
        if username:
            invited_user.username = username
        if hashed_password:
            invited_user.password = hashed_password
        else:
            invited_user.password = generate_password_hash(password)
        try:
            self.get_session.merge(invited_user)
            self.get_session.commit()
            return invited_user
        except Exception as e:
            self.get_session.rollback()
            logging.error(e)
            return None

    def find_invite_roles(self, inviter_id):
        inviter = self.get_user_by_id(inviter_id)
        for role in inviter.roles:
            if role.name == 'team_owner':
                invite_roles = [self.find_role(role_name) for role_name in OWNER_INVITE_ROLES]
                return [(str(invite_role.id), invite_role.name) for invite_role in invite_roles]
            elif role.name == 'Admin':
                return [(str(invite_role.id), invite_role.name) for invite_role in self.get_all_roles()]

    def find_solar_default_role_id(self):
        return self.get_session.query(self.role_model).filter_by(name='solar_default').first()

    def get_awaiting_emails(self, user_id):
        team_name = self.find_team(user_id=user_id).team_name
        all_waiting_users = self.get_session.query(self.registeruser_model).filter_by(team=team_name).all()
        return self.invitation_is_valid(all_waiting_users)

    def get_registered_user(self, user_email):
        reg_user = self.get_session.query(self.registeruser_model).filter_by(email=user_email).first()
        return reg_user

    def get_team_members(self, user_id):
        team_name = self.find_team(user_id=user_id).team_name
        team = self.get_session.query(self.team_model).filter_by(team_name=team_name).first()
        email_role = []
        for user in team.users:
            user_role = user.roles[0].name
            if user_role == 'team_owner':
                email_role.append((user.email, 'Admin'))
            else:
                email_role.append((user.email, 'User'))

        return email_role

    def update_team_name(self, user_id, new_team_name):
        current_team_name = self.find_team(user_id=user_id).team_name
        awaiting_users = self.get_session.query(self.registeruser_model).filter_by(
            team=current_team_name).all()
        for user in awaiting_users:
            user.team = new_team_name

        team = self.get_session.query(self.team_model).filter_by(team_name=current_team_name).first()
        team.team_name = new_team_name
        self.get_session.commit()
        return True

    def invitation_is_valid(self, users):
        user_valid = []
        for user in users:
            if datetime.datetime.now() > user.valid_date:
                user_valid.append((user.email, False))
            else:
                user_valid.append((user.email, True))

        return user_valid

    def add_invite_register_user(self, email, team, first_name=None, last_name=None,
                                 role=None, inviter=None, password='', hashed_password=''):
        invited_user = self.registeruser_model()
        # email and team parameters should be always available.
        invited_user.email = email
        invited_user.team = team.team_name
        invited_user.username = 'solarbi_' + \
            ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=8))

        if first_name:
            invited_user.first_name = first_name
        if last_name:
            invited_user.last_name = last_name
        if inviter:
            invited_user.inviter = inviter
        if role:
            invited_user.role_assigned = role
        if hashed_password:
            invited_user.password = hashed_password
        else:
            invited_user.password = generate_password_hash(password)

        invited_user.registration_hash = str(uuid.uuid1())
        try:
            self.get_session.add(invited_user)
            self.get_session.commit()
        except Exception as e:
            self.get_session.rollback()
            logging.error(e)
            raise ValueError('Invitation is failed because of database integrity error')
        return invited_user

    def delete_invited_user(self, user_email):
        try:
            user = self.get_session.query(self.registeruser_model).\
                filter_by(email=user_email).first()
            self.del_register_user(user)
            return True
        except Exception:
            self.get_session.rollback()
            return False