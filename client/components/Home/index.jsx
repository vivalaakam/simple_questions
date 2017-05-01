import React from 'react';
import { Link } from 'react-router';
import QuestionsContainer from '../../containers/Questions'

export default function Home() {
  const navLinkProps = {
    className: 'layout__nav-link',
    activeClassName: 'layout__nav-link--selected'
  };

  return (
    <div style={{ flex: 1 }}>
      <nav>
        <Link to="/" {...navLinkProps}>Home</Link>
        <Link to="/auth" {...navLinkProps}>Auth</Link>
      </nav>
      <QuestionsContainer />
    </div>
  );
}
