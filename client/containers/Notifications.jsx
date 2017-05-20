import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeNotification } from '../reducers/notifications';

import NotificationsWidget from '../components/Notifications';

const state = ({ notifications }) => ({
  notifications
});

const actions = (dispatch) => ({
  actions: bindActionCreators({ closeNotification }, dispatch)
});

const Notifications = (props) => {
  const { notifications, actions, router } = props;
  return (
    <NotificationsWidget {...{ notifications, actions, router }} />
  );
};

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired
};

export default connect(state, actions)(Notifications);
