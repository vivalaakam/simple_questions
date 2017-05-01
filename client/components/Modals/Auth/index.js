import React, { Component, PropTypes } from 'react';
import Modal from '../../Modal';
import Auth from '../../../containers/Auth';

export default class ModalsAuth extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired
  };

  render() {
    const params = {
      title: 'Войти/Зарегистрироваться'
    };

    return (
      <Modal {...params} modal={this.props.modal}>
        <Auth />
      </Modal>
    );
  }
}
