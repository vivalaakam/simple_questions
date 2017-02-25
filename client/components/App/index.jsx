import React, { PropTypes } from 'react';
import style from './App.scss';

export default function App({ children }) {
  return (
    <section className={style.App}>
      {children}
    </section>
  );
}

App.propTypes = {
  children: PropTypes.any
};
