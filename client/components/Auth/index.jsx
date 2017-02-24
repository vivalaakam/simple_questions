import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import token from '../../utils/token';
import { Inp, Btn } from '../UI';
import style from './Auth.scss';
import loginPopup from '../../helpers/loginPopup';

export default class Auth extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  getError() {
    const { auth } = this.props;
    if (auth.error) {
      return (
        <div>{this.props.auth.error}</div>
      );
    }

    return null;
  }

  submitAuth() {
    const { actions } = this.props;

    if (this.refEmail.value === '') {
      actions.errorAuth('Field email can`t be blank');
      return;
    }

    if (this.refPassword.value === '') {
      actions.errorAuth('Field password can`t be blank');
      return;
    }

    actions.authentificate({ username: this.refEmail.value, password: this.refPassword.value });
  }

  github(e) {
    if (e) {
      e.preventDefault();
    }
    const { actions } = this.props;
    loginPopup('github')
      .then((data) => {
        token.setToken(data.token);
        actions.applyAuth(data);
      })
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["log"] }] */
        console.log(error.message);
      });
  }

  render() {
    return (
      <div className={style.Auth}>
        {this.getError()}
        <div className={style.row}>
          <Inp type="email" name="email" link={c => (this.refEmail = c)} placeholder="email" />
        </div>
        <div className={style.row}>
          <Inp type="password" name="password" link={c => (this.refPassword = c)} placeholder="passport" />
        </div>
        <div className={style.row}>
          <Btn
            className={classnames(style.btn, 'submit')}
            onClick={::this.submitAuth}
          >Submit</Btn>
        </div>
        <div className={style.row}>
          <Btn className={style.btn} scheme="github" onClick={::this.github}>Login via GitHub</Btn>
        </div>
      </div>
    );
  }
}
