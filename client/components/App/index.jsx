import React, { PropTypes } from 'react';
import style from './App.scss';

import TopBar from '../../containers/TopBar'

export default function App({ children }) {
  return (
    <section className={style.App}>
      <TopBar />
      {children}
    </section>
  );
}

App.propTypes = {
  children: PropTypes.any
};
