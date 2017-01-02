import React from 'react';
import { Router, browserHistory, createMemoryHistory } from 'react-router';

import routes from '../routes';
import { isBrowser } from '../utils';

export const history = isBrowser ? browserHistory : createMemoryHistory();

export default function Root() {
  return (
    <Router history={history}>
      {routes()}
    </Router>
  );
}
