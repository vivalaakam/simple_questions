import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { getAsyncInjectors } from './utils/asyncInjectors';
import App from './components/App';
import Restricted from './containers/Restricted';

export default function routes(store) {
  const { injectReducer } = getAsyncInjectors(store);

  function componentLoaded(cb, LoadedComponent) {
    if (LoadedComponent.reducer) {
      injectReducer(LoadedComponent.reducer.name, LoadedComponent.reducer);
    }

    cb(null, LoadedComponent.default || LoadedComponent);
  }

  function getComponent(name) {
    return (next, cb) => {
      System.import(`./containers/${name}`)
        .then((LoadedComponent) => {
          componentLoaded(cb, LoadedComponent);
        });
    };
  }

  return (
    <Route path="/" component={App}>
      <IndexRoute getComponent={getComponent('Home')} />
      <Route path="/game" getComponent={getComponent('Game')} />
      <Route path="/restricted" component={Restricted}>
        <IndexRoute getComponent={getComponent('RestrictedHome')} />
        <Route path="redirect" getComponent={getComponent('RestrictedHome')} redirect />
      </Route>
      <Route path="*" getComponent={getComponent('NotFound')} />
    </Route>
  );
}
