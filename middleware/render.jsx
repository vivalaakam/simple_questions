import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from '../html';

export default function (req, res) {
  if (process.env.NODE_ENV === 'development') {
    webpackIsomorphicTools.refresh();
  }

  const render = ReactDOM.renderToString(
    <Html
      assets={webpackIsomorphicTools.assets()}
      component={res.routerContext}
    />
  );

  res.send(
    `<!doctype html>\n${render}`
  );
}
