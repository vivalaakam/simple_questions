import React from 'react';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory, createMemoryHistory } from 'react-router';

import configureStore from '../store';
import makeRoutes from '../routes';
import { isBrowser } from '../utils';

const store = configureStore(window.__INITIAL_STATE__); // eslint-disable-line

export const history = isBrowser ? browserHistory : createMemoryHistory();

const reduxHistory = syncHistoryWithStore(history, store);

export default function Root() {
  return (
    <Provider store={store}>
      <Router history={reduxHistory}>
        {makeRoutes(store)}
      </Router>
    </Provider>
  );
}
