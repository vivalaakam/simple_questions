import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../reducers/auth';
import { showModal } from '../reducers/modal';
import TopBarWidget from '../components/TopBar';

const state = ({ auth }) => ({ auth });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({
    logout,
    showModal
  }, dispatch),
  dispatch
});

function TopBar({ actions, auth }) {
  return (<TopBarWidget {...{ actions, auth }} />);
}

TopBar.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(state, actionsDispatch)(TopBar);
