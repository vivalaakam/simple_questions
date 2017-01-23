import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory, createMemoryHistory } from 'react-router';

import { updateState } from './reducers/outer';
import createReducers from './reducers';
import sagas from './sagas';
import { isBrowser } from './utils';

const sagaMiddleware = createSagaMiddleware();

const history = isBrowser ? browserHistory : createMemoryHistory();

const middleware = [
  thunk,
  sagaMiddleware,
  routerMiddleware(history)
];

export default function configureStore(initialState) {
  const store = createStore(
    createReducers(),
    {},
    compose(applyMiddleware(...middleware))
  );

  store.updateState = (state) => {
    const keys = Object.keys(store.getState());
    const filtered = keys.reduce((st, key) => {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        st[key] = state[key];
      }
      return st;
    }, {});

    return store.dispatch(updateState(filtered));
  };
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {};

  store.updateState(initialState);

  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      System.import('./reducers').then((reducerModule) => {
        const createReducersLoaded = reducerModule.default;
        const nextReducers = createReducersLoaded(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  sagaMiddleware.run(sagas);

  return store;
}
