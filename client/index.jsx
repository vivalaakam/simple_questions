import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import style from './styles/main.scss';
import Root from './containers/Root';
import HmrContainer from './containers/HmrContainer';

const App = (
  <HmrContainer>
    <Root />
  </HmrContainer>
);

const root = document.getElementById('root');
root.classList.add(style.root);
ReactDOM.render(
  App,
  root
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextApp = require('./containers/Root'); // eslint-disable-line
    ReactDOM.render(
      <HmrContainer>
        <NextApp />
      </HmrContainer>,
      root
    );
  });
}
