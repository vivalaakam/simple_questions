import React, { PureComponent, PropTypes } from 'react';
import { Btn, Inp, TextArea } from '../UI';
import style from './Settings.scss';

export default class QuestionView extends PureComponent {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  lastName;
  firstName;

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

  setRefLastName = (link) => {
    this.lastName = link;
  };

  setRefFirstName = (link) => {
    this.firstName = link;
  };

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
              Фамилия
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
      </div>
    );
  }
}
