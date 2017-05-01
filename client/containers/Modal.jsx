import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as modalActions from '../reducers/modal';

const MODAL_COMPONENTS = {};

const state = ({ modal }) => ({ modal });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators(modalActions, dispatch),
  dispatch
});

function Modal({ actions, modal }) {
  if (!modal.type || !MODAL_COMPONENTS[modal.type]) {
    return null;
  }
  const Comp = MODAL_COMPONENTS[modal.type];
  return (
    <Comp {...modal.props} actions={actions} modal={modal} />
  );
}

Modal.propTypes = {
  actions: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired
};

export default connect(state, actionsDispatch)(Modal);
