import React from 'react';
import { Link } from 'react-router';
import style from './LeftMenu.scss';

export default function LeftMenu() {
  return (
    <div className={style.LeftMenu}>
      <Link to="/home">Home</Link>
      <Link to="/todos">Todos</Link>
    </div>
  );
}
