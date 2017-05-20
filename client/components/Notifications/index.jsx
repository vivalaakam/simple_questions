import React, { Component, PropTypes } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

import Notification from '../Notification';
import style from './Notifications.scss';

export default class NotificationsWidget extends Component {

  onClose = (notification) => {
    const { actions } = this.props;
    actions.closeNotification(notification);
  };

  redirect = (notification) => {
    const { actions, router } = this.props;
    actions.closeNotification(notification);
    router.push(`/${notification.source_id}`);
  };

  notifications() {
    const { notifications } = this.props;

    return notifications
      .filter(notification => notification.is_new)
      .map((notification) => (
        <Notification
          notification={notification}
          key={notification.id}
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
