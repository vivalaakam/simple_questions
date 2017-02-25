import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Restricted from '../components/Restricted';

const state = ({ auth }) => ({ auth });

class RestrictedContainer extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    router: PropTypes.object
  };

  componentWillMount() {
    this.checkAuth();
  }

  componentWillReceiveProps() {
    this.checkAuth();
  }

  checkAuth() {
    if (!this.props.auth.id) {
      this.props.router.push('/auth');
    }
  }

  render() {
    if (this.props.auth.id) {
      return (
        <Restricted>
          {this.props.children}
        </Restricted>
      );
    }
    return null;
  }
}


export default connect(state)(RestrictedContainer);
