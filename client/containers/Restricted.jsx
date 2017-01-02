import { Component, PropTypes } from 'react';

export default class Restricted extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    router: PropTypes.object,
    routes: PropTypes.array
  };

  componentWillMount() {
    this.redirect();
  }

  componentWillReceiveProps() {
    this.redirect();
  }

  redirect() {
    const hasRedirect = this.props.routes.some(route => route.redirect);
    if (hasRedirect) {
      this.props.router.push('/game');
    }
  }


  render() {
    return this.props.children;
  }
}
