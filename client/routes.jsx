import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Homepage from './containers/Home';
import Game from './containers/Game';
import Restricted from './containers/Restricted';
import RestrictedHome from './containers/RestrictedHome';
import NotFound from './containers/NotFound';

export default function routes() {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Homepage} />
      <Route path="/game" component={Game} />
      <Route path="/restricted" component={Restricted}>
        <IndexRoute component={RestrictedHome} />
        <Route path="redirect" component={RestrictedHome} redirect />
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  );
}
