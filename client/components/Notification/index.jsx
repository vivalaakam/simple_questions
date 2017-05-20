import React, { PureComponent, PropTypes } from 'react';
import style from './Notification.scss';

export default class Notification extends PureComponent {
  static propTypes = {
    notification: PropTypes.object.isRequired,
    redirect: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  onClick = () => {
    const { notification, redirect, onClose } = this.props;
    redirect(notification);
    onClose(notification);
  };

  onClose = (e) => {
    const { notification, onClose } = this.props;
    e.stopPropagation();
    onClose(notification);
  };

  componentWillEnter(callback) {
    this.notification.classList.add(style.animationLeave);
    setTimeout(() => {
      callback();
    }, 500);
  }

  componentDidEnter() {
    this.notification.classList.remove(style.animationActive);
  }

  componentWillLeave(callback) {
    this.notification.classList.add(style.animationLeave);
    setTimeout(() => {
      callback();
    }, 500);
  }

  refNotification = (link) => {
    this.notification = link;
  };

  notification = null;

  render() {
    const { notification } = this.props;
    return (
      <div className={style.Notification} onClick={this.onClick} ref={this.refNotification}>
        <div className={style.title}>{notification.title}</div>
        <div className={style.text}>{notification.body}</div>
        <button
          className={style.close}
          onClick={this.onClose}
        >&times;</button>
      </div>
    );
  }
};
