import React, { PropTypes } from 'react';
import style from './Restricted.scss';
import LeftMenu from '../LeftMenu';

export default function Restricted({ children }) {
  return (
    <div className={style.Restricted}>
      <div className={style.container}>
        {children}
      </div>
    </div>
  );
}

Restricted.propTypes = {
  children: PropTypes.element.isRequired
};
