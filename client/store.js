import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createReducers from './reducers';
import { inBrowser } from './utils';

const middleware = [
  thunk,
  createLogger({
    predicate: () => inBrowser && process.env.NODE_ENV !== 'production',
    collapsed: true
  })
];

export default function configureStore(initialState) {
  const store = createStore(
    createReducers(),
    initialState,
    applyMiddleware(...middleware)
  );

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

  return store;
}
