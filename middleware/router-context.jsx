/* eslint-disable no-param-reassign */
import React from 'react';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import configureStore from '../client/store';
import makeRoutes from '../client/routes';

export default function routerContext(req, res, next) {
  const store = configureStore();
  const routes = makeRoutes(store);
  match({
    routes,
    location: req.url
  }, (error, redirect, renderProps) => {
    if (error) {
      throw error;
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else {
      // path * will return a 404
      const isNotFound = renderProps.routes.find(route => route.path === '*');
      res.status(isNotFound ? 404 : 200);
      res.routerContext = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      next();
    }
  });
}
