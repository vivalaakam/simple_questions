import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import style from './TopBar.scss';

export default class TopBar extends PureComponent {
  showModal = () => {
    this.props.actions.showModal({
      type: 'MODAL_AUTH'
    });
  }

  renderAuth() {
    const { auth } = this.props;
    if (!auth.id) {
      return (
        <button className={style.actionLink} onClick={this.showModal}>Войти/Зарегистрироваться</button>
      );
    }

    return (
      <div>
        <Link className={style.link} to="/settings">{auth.email}</Link>
        <br />
        <button className={style.actionLink} onClick={this.props.actions.logout}>
          Выйти
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className={style.TopBar}>
        <div className={style.search}>
          TopBar
        </div>
        <div className={style.auth}>
          {this.renderAuth()}
        </div>
      </div>
    );
  }
}
