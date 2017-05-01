import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Auth from './containers/Auth';
import NotFound from './containers/NotFound';
import Restricted from './containers/Restricted';
import RestrictedHome from './containers/RestrictedHome';
import QuestionView from './containers/QuestionView';
import QuestionCreate from './containers/QuestionCreate';

export default function routes(store) {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/create" component={QuestionCreate} />
      <Route path="/:id" component={QuestionView} />
      <Route path="/auth" component={Auth} />
      <Route path="/" component={Restricted}>
        <Route path="settings" component={RestrictedHome} />
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  );
}
