import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const state = ({ auth }) => ({ auth });

class LoggedInContainer extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    success: PropTypes.func,
    fallback: PropTypes.func
  };

  static defaultProps = {
    success: () => null,
    fallback: () => null
  };

  checkAuth() {
    return this.props.auth.id;
  }

  render() {
    if (this.checkAuth()) {
      return this.props.success();
    }

    return this.props.fallback();
  }
}

export default connect(state)(LoggedInContainer);
