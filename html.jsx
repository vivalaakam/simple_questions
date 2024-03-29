import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';

export default function Html({ assets, component, initialState }) {
  const content = component ? ReactDOM.renderToString(component) : '';
  const head = Helmet.rewind();
  return (
    <html lang="en-US">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0" />
        {Object.keys(assets.styles).map((style, key) =>
          <link
            href={assets.styles[style]}
            key={key}
            media="screen, projection"
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
          />
        )}
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}` }} />
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script src={assets.javascript.main} charSet="UTF-8" />
      </body>
    </html>
  );
}


Html.propTypes = {
  assets: PropTypes.object,
  component: PropTypes.node,
  initialState: PropTypes.object
};
