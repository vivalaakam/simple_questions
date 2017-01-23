import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const state = ({ auth }) => ({ auth });


class Restricted extends Component {
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
      return this.props.children;
    }
    return null;
  }
}


export default connect(state)(Restricted);
