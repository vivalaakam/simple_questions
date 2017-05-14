import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';
import style from './TopBar.scss';
import Search from '../../containers/Search';
import LoggedIn from '../../containers/LoggedIn';

export default class TopBar extends PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    routing: PropTypes.object.isRequired
  };

  showModal = () => {
    this.props.actions.showModal({
      type: 'MODAL_AUTH'
    });
  };

  renderAuthSuccess = () => {
    const { auth } = this.props;
    return (
      <div>
        <Link className={style.link} to="/settings">{auth.name}</Link>
        <br />
        <button className={style.actionLink} onClick={this.props.actions.logout}>
          Выйти
        </button>
      </div>
    );
  };

  renderAuthFallback = () => {
    return (
      <button className={style.actionLink} onClick={this.showModal}>Войти/Зарегистрироваться</button>
    );
  };

  renderAuth() {
    return (
      <LoggedIn
        success={this.renderAuthSuccess}
        fallback={this.renderAuthFallback}
      />
    );
  }

  renderGoBack() {
    const { routing } = this.props;
    if(!routing.locationBeforeTransitions) {
      return null;
    }
    if (routing.locationBeforeTransitions.pathname === '/') {
      return null;
    }

    return (
      <Link to="/" className={style.actionLink}>На главную</Link>
    );
  }

  render() {
    return (
      <div className={style.TopBar}>
        <div className={style.goBack}>
          {this.renderGoBack()}
        </div>
        <Search className={style.search} />
        <div className={style.auth}>
          {this.renderAuth()}
        </div>
      </div>
    );
  }
}
