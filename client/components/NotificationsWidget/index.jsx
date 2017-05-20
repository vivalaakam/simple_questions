import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import style from './NotificationsWidget.scss';

export { style };

export default class NotificationWidget extends PureComponent {
  static propTypes = {
    app: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  onButtonClick = () => {
    this.props.actions.resetSearchApp({
      notificationsActive: !this.props.app.notificationsActive
    });
  };

  onBackClick = () => {
    this.props.actions.resetSearchApp({
      notificationsActive: false
    });
  };

  onClickNotification = (notification) => () => {
    this.props.actions.closeNotification(notification);
    this.props.actions.resetSearchApp({
      notificationsActive: false
    });
  };

  onClickClose = (notification) => (e) => {
    e.preventDefault();
  };

  renderBack() {
    if (!this.props.app.notificationsActive) {
      return null;
    }

    return (
      <div className={style.back} onClick={this.onBackClick}></div>
    );
  }

  renderPopup() {
    if (!this.props.app.notificationsActive) {
      return null;
    }

    return (
      <div className={style.popup}>
        {this.renderNotifications()}
      </div>
    );
  }

  renderNotifications() {
    if (!this.props.notifications.length) {
      return (
        <div className={style.row}>
          Нет новых уведомлений
        </div>
      );
    }

    const results = this.props.notifications.map((notification) => {
      return (
        <Link
          key={notification.id}
          className={style.row}
          to={`/${notification.source_id}`}
          onClick={this.onClickNotification(notification)}
        >
          <h4>{notification.title}</h4>
          <p>{notification.body}</p>
          <button
            className={style.close}
            onClick={this.onClickClose(notification)}
          >&times;</button>
        </Link>
      );
    });

    results.push(
      <button key="clear" onClick={this.props.actions.clearNotification} className={classnames(style.row, style.clear)}>
        Удалить все уведомления
      </button>
    );

    return results;
  }

  render() {
    if (!this.props.notifications.length) {
      return (
        <div className={style.NotificationsWidget}>
          <button className={style.button} onClick={this.onButtonClick}>
            &nbsp;
          </button>
          {this.renderBack()}
          {this.renderPopup()}
        </div>
      );
    }

    const className = classnames(style.button, {
      [style.active]: !!this.props.notifications.length
    });

    return (
      <div className={style.NotificationsWidget}>
        <button className={className} onClick={this.onButtonClick}>
          <span>{this.props.notifications.length}</span>
        </button>
        {this.renderBack()}
        {this.renderPopup()}
      </div>
    );
  }
}
