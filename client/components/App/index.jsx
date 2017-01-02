import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import style from './App.scss';

export default function App({ children }) {
  const navLinkProps = {
    className: 'layout__nav-link',
    activeClassName: 'layout__nav-link--selected'
  };

  return (
    <div className={style.App}>
      <nav>
        <Link to="/" {...navLinkProps}>Home</Link>
        <Link to="/game" {...navLinkProps}>Game</Link>
        <Link to="/restricted" {...navLinkProps}>Restricted</Link>
        <Link to="/restricted/redirect" {...navLinkProps}>Restricted Redirect</Link>
      </nav>
      <section>
        {children}
      </section>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.any
};
