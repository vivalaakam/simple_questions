import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';
import style from './TopBar.scss';
import Search from '../../containers/Search';

export default class TopBar extends PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  }

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
        <Search className={style.search} />
        <div className={style.auth}>
          {this.renderAuth()}
        </div>
      </div>
    );
  }
}
