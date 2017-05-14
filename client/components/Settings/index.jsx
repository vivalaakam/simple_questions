import React, { PureComponent, PropTypes } from 'react';
import { Btn, Inp, TextArea } from '../UI';
import style from './Settings.scss';

export default class QuestionView extends PureComponent {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  onChangeLastName = () => {
    this.props.actions.changeAuth({
      tmp_last_name: this.lastName.value
    });
  };

  onChangeFirstName = () => {
    this.props.actions.changeAuth({
      tmp_first_name: this.firstName.value
    });
  };

  onChangePassword = () => {
    this.props.actions.changeAuth({
      password: this.password.value
    });
  };

  onChangePasswordConfirmation = () => {
    this.props.actions.changeAuth({
      password_confirmation: this.passwordConfirmation.value
    });
  };

  setRefLastName = (link) => {
    this.lastName = link;
  };

  setRefFirstName = (link) => {
    this.firstName = link;
  };

  setRefPassword = (link) => {
    this.password = link;
  };

  setRefPasswordConfirmation = (link) => {
    this.passwordConfirmation = link;
  };

  lastName;
  firstName;
  password;
  passwordConfirmation;

  renderErrors() {
    const { auth } = this.props;
    if (!auth.wrongPassword && !auth.smallPassword) {
      return null;
    }

    const errors = [];
    if (auth.wrongPassword) {
      errors.push(<li key="wrongPassword">Пароли не совпадают</li>);
    }
    if (auth.smallPassword) {
      errors.push(<li key="smallPassoword">Длинна пароля должна составлять не менее 8 символов</li>);
    }

    return (
      <div className={style.row}>
        <ul>
          {errors}
        </ul>
      </div>
    );
  }

  render() {
    const { auth } = this.props;
    return (
      <div className={style.Settings}>
        <div className={style.titleRow}>
          <h1 className={style.title}>Настройки</h1>
        </div>
        <div className={style.row}>
          <h3>Сменить личные данные</h3>
        </div>
        <div className={style.row}>
          <div className={style.section}>
            <label htmlFor="first_name">
              Имя
            </label>
            <Inp
              className={style.inp}
              name="first_name"
              onChange={this.onChangeFirstName}
              link={this.setRefFirstName}
              value={auth.tmp_first_name}
              placeholder="Имя"
            />
          </div>
          <div className={style.section}>
            <label htmlFor="last_name">
              Фамилия
            </label>
            <Inp
              className={style.inp}
              name="title"
              onChange={this.onChangeLastName}
              link={this.setRefLastName}
              value={auth.tmp_last_name}
              placeholder="Фамилия"
            />
          </div>
        </div>
        <div className={style.row}>
          <Btn onClick={this.props.actions.updateAuth}>Обновить</Btn>
        </div>
        <div className={style.titleSection}>
          <h3>Сменить пароль</h3>
          <p>Длинна пароля должна составлять не менее 8 символов</p>
        </div>
        <div className={style.row}>
          <div className={style.section}>
            <label htmlFor="password">
              Пароль
            </label>
            <Inp
              className={style.inp}
              name="password"
              onChange={this.onChangePassword}
              link={this.setRefPassword}
              value={auth.password}
              type="password"
              placeholder="Пароль"
            />
          </div>
          <div className={style.section}>
            <label htmlFor="password_confirmation">
              Повторите пароль
            </label>
            <Inp
              className={style.inp}
              name="password_confirmation"
              onChange={this.onChangePasswordConfirmation}
              link={this.setRefPasswordConfirmation}
              value={auth.password_confirmation}
              type="password"
              placeholder="Повторите пароль"
            />
          </div>
        </div>
        {this.renderErrors()}
        <div className={style.row}>
          <Btn onClick={this.props.actions.updatePasswordAuth}>Обновить пароль</Btn>
        </div>
      </div>
    );
  }
}
