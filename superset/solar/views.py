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
import logging

from flask import flash, redirect, url_for, g, request, make_response
from flask_appbuilder import has_access
from flask_babel import lazy_gettext
from flask_mail import Mail, Message
from flask_login import login_user

from flask_appbuilder.views import expose, PublicFormView, ModelView
from flask_appbuilder.security.forms import ResetPasswordForm

from .forms import (
    SolarBILoginForm_db,
    SolarBIPasswordRecoverForm,
    SolarBIPasswordRecoverFormWidget,
    SolarBIPasswordResetFormWidget,
    SolarBIPasswordResetForm,
    SolarBIUserInfoEditForm,
    SolarBIIUserInfoEditWidget,
    SolarBIResetMyPasswordWidget,
)
from flask_appbuilder._compat import as_unicode

from flask_appbuilder.security.views import AuthDBView, UserInfoEditView, ResetMyPasswordView


log = logging.getLogger(__name__)


class SolarBIAuthDBView(AuthDBView):
    invalid_login_message = lazy_gettext("Email/Username or password incorrect. Please try again.")
    login_template = "appbuilder/general/security/solarbi_login_db.html"
    @expose("/login/", methods=["GET", "POST"])
    def login(self):
        if g.user is not None and g.user.is_authenticated:
            return redirect(self.appbuilder.get_url_for_index)
        form = SolarBILoginForm_db()
        if form.validate_on_submit():
            user = self.appbuilder.sm.auth_user_db(
                form.username.data, form.password.data
            )
            if not user:
                flash(as_unicode(self.invalid_login_message), "warning")
                return redirect(self.appbuilder.get_url_for_login)

            remember = form.remember_me.data
            login_user(user, remember=remember)
            return redirect(self.appbuilder.get_url_for_index)
        return self.render_template(
            self.login_template, title=self.title, form=form, appbuilder=self.appbuilder
        )


class SolarBIPasswordRecoverView(PublicFormView):
    """
        This is the view for recovering password
    """

    route_base = '/password-recover'

    email_template = 'appbuilder/general/security/password_recover_mail.html'
    """ The template used to generate the email sent to the user """

    email_subject = lazy_gettext('SolarBI - Reset Your Password')
    """ The email subject sent to the user """

    message = lazy_gettext('Password reset link sent to your email')
    """ The message shown on a successful registration """

    error_message = lazy_gettext('This email is not registered or confirmed yet.')
    """ The message shown on an unsuccessful registration """

    form = SolarBIPasswordRecoverForm
    edit_widget = SolarBIPasswordRecoverFormWidget
    form_template = 'appbuilder/general/security/recover_password_form_template.html'

    def send_email(self, email, hash_val):
        """
            Method for sending the registration Email to the user
        """
        mail = Mail(self.appbuilder.get_app)
        msg = Message()
        msg.sender = 'SolarBI', 'chenyang.wang@zawee.work'
        msg.subject = self.email_subject
        url = url_for('.reset', _external=True, reset_hash=hash_val)
        msg.html = self.render_template(self.email_template,
                                        url=url)
        msg.recipients = [email]
        try:
            mail.send(msg)
        except Exception as e:
            log.error('Send email exception: {0}'.format(str(e)))
            return False
        return True

    def add_password_reset(self, email):
        reset_hash = self.appbuilder.sm.add_reset_request(email)
        if reset_hash is not None:
            flash(as_unicode(self.message), 'info')
            self.send_email(email, reset_hash)
            return redirect(self.appbuilder.get_url_for_index)
        else:
            flash(as_unicode(self.error_message), 'danger')
            return redirect(self.appbuilder.get_url_for_index)

    @expose('/reset/<string:reset_hash>')
    def reset(self, reset_hash):
        """ This is end point to verify the reset password hash from user
        """
        if reset_hash is not None:
            return redirect(self.appbuilder.sm.get_url_for_reset(token=reset_hash))

    def form_post(self, form):
        return self.add_password_reset(email=form.email.data)


class SolarBIResetPasswordView(PublicFormView):
    route_base = '/reset'
    form = SolarBIPasswordResetForm
    form_template = 'appbuilder/general/security/reset_password_form_template.html'
    edit_widget = SolarBIPasswordResetFormWidget
    redirect_url = '/'
    message = lazy_gettext('Password has been reset.')
    error_message = lazy_gettext('Sorry, the link has expired.')

    @expose('/form', methods=['GET'])
    def this_form_get(self):
        self._init_vars()
        form = self.form.refresh()
        token = request.args.get('token')
        user = self.appbuilder.sm.find_user_by_token(token)
        if user is not None:
            self.form_get(form)
            widgets = self._get_edit_widget(form=form)
            self.update_redirect()
            return self.render_template(self.form_template,
                                        title=self.form_title,
                                        widgets=widgets,
                                        appbuilder=self.appbuilder)
        flash(as_unicode(self.error_message), 'danger')
        return redirect(self.appbuilder.get_url_for_index)

    @expose('/form', methods=['POST'])
    def this_form_post(self):
        self._init_vars()
        form = self.form.refresh()
        if form.validate_on_submit():
            token = request.args.get('token')
            response = self.form_post(form, token=token)
            if not response:
                return self.this_form_get()
            return redirect(response)
        else:
            widgets = self._get_edit_widget(form=form)
            return self.render_template(
                self.form_template,
                title=self.form_title,
                widgets=widgets,
                appbuilder=self.appbuilder,
            )

    def form_post(self, form, **kwargs):
        token = kwargs['token']
        user = self.appbuilder.sm.find_user_by_token(token)

        if user is not None:
            flash(as_unicode(self.message), 'info')
            password = form.password.data
            self.appbuilder.sm.reset_password(user.id, password)
            self.appbuilder.sm.set_token_used(token)
            return self.appbuilder.get_url_for_index

        return None


class SolarBIUserInfoEditView(UserInfoEditView):
    form_title = 'My Profile - SolarBI'
    form = SolarBIUserInfoEditForm
    form_template = 'appbuilder/general/security/edit_user_info.html'
    edit_widget = SolarBIIUserInfoEditWidget

    @expose("/form", methods=["POST"])
    @has_access
    def this_form_post(self):
        self._init_vars()
        form = self.form.refresh()

        if form.validate_on_submit():
            response = self.form_post(form)
            if not response:
                return redirect("/solarbiuserinfoeditview/form")
            return response
        else:
            widgets = self._get_edit_widget(form=form)
            return self.render_template(
                self.form_template,
                title=self.form_title,
                widgets=widgets,
                appbuilder=self.appbuilder,
            )


class SolarBIResetMyPasswordView(ResetMyPasswordView):
    form_template = 'appbuilder/general/security/reset_my_password.html'
    edit_widget = SolarBIResetMyPasswordWidget
# class SolarBIUserDBModelView(UserDBModelView):
#     # pass
#     # route_base = '/solar'
#     show_template = 'appbuilder/general/security/my_profile.html'
#     show_widget = SolarBIShowWidget


