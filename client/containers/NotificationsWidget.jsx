import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NotificationsWidget from '../components/NotificationsWidget';
import { resetSearchApp } from '../reducers/app';
import { closeNotification, clearNotification } from '../reducers/notifications';

const mapStateToProps = state => ({
  auth: state.auth,
  notifications: state.notifications,
  app: state.app
});

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({
    resetSearchApp,
    closeNotification,
    clearNotification
  }, dispatch)
});

function NotificationsWidgetContainer(props) {
  return (
    <NotificationsWidget {...props} />
  );
}

NotificationsWidgetContainer.propTypes = {
  app: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, actionsDispatch)(NotificationsWidgetContainer);
