import React, { PropTypes } from 'react';
import style from './Inp.scss';

export default function Inp({ onChange, onBlur, onFocus, onKeyDown, value, link, name, placeholder = '', type = 'text' }) {
  return (
    <input
      className={style.Inp}
      ref={c => (link(c))}
      {...{ name, value, type, placeholder, onChange, onBlur, onFocus, onKeyDown, id: name }}
    />
  );
}

Inp.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  link: PropTypes.func,
  type: PropTypes.string
};
