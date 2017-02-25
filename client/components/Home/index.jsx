import React from 'react';
import { Link } from 'react-router';

export default function Home() {
  const navLinkProps = {
    className: 'layout__nav-link',
    activeClassName: 'layout__nav-link--selected'
  };

  return (
    <div>
      <nav>
        <Link to="/" {...navLinkProps}>Home</Link>
        <Link to="/game" {...navLinkProps}>Game</Link>
        <Link to="/auth" {...navLinkProps}>Auth</Link>
        <Link to="/home" {...navLinkProps}>Home</Link>
      </nav>
      <section>
        Main page
      </section>
    </div>
  );
}
