import React, { Component, PropTypes } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

import Notification from '../Notification';
import style from './Notifications.scss';

export default class NotificationsWidget extends Component {

  onClose = (notification) => {
    const { actions } = this.props;
    actions.removeNotification(notification);
  }

  redirect = (notification) => {
    const { actions, router } = this.props;
    actions.removeNotification(notification);
    router.push(`/${notification.id}`);
  }

  notifications() {
    const { notifications } = this.props;

    return notifications.map((notification, i) => (
      <Notification
        notification={notification}
        key={notification.uid}
        onClose={::this.onClose}
        redirect={this.redirect}
      />
    ));
  }

  render() {
    return (
      <ReactTransitionGroup component="div" className={style.Notifications}>
        {this.notifications()}
      </ReactTransitionGroup>
    );
  }
}
