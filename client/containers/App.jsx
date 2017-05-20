import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import Notifications from './Notifications';
import AppWidget from '../components/App';

function App({ children, router }) {
  return (
    <div className="app">
      <AppWidget>
        {children}
      </AppWidget>
      <Modal />
      <Notifications router={router} />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default connect(state => state)(App);
