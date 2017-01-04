import React, { PropTypes } from 'react';
import style from './Button.scss';

function Button({ children, onClick }) {
  return (
    <button className={style.Button} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Button;
