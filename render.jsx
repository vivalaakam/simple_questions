import React from 'react';
import ReactDOM from 'react-dom/server';
import Root from './client/containers/Root';
import Html from './html';

export default function () {
  if (process.env.NODE_ENV === 'development') {
    webpackIsomorphicTools.refresh();
  }

  const component = (
    <Root />
  );

  const render = ReactDOM.renderToString(
    <Html
      assets={webpackIsomorphicTools.assets()}
      component={component}
    />
  );

  return (
    `<!doctype html>\n${render}`
  );
}
