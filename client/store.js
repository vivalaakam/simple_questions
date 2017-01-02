import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import createReducers from './reducers';
import { isBrowser } from './utils';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  thunk,
  sagaMiddleware
];

const composeEnhancers = isBrowser ?
  composeWithDevTools({
    serializeAction: (key, value) => {
      if (typeof value === 'symbol') {
        return String(value);
      }
      return value;
    }
  }) : compose;

export default function configureStore(initialState) {
  const store = createStore(
    createReducers(),
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {};

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
