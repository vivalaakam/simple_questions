import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeAuth, updateAuth } from '../reducers/auth';
import SettingsWidget from '../components/Settings';

const state = ({ auth }) => ({ auth });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({
    changeAuth,
    updateAuth
  }, dispatch),
  dispatch
});

function SettingsContainer({ actions, auth }) {
  return (
    <SettingsWidget {...{ actions, auth }} />
  );
}

SettingsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(state, actionsDispatch)(SettingsContainer);
