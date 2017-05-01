import React, { PropTypes } from 'react';
import style from './TextArea.scss';

export default function TextArea({ onChange, onBlur, onKeyDown, value, link, name, placeholder = '' }) {
  return (
    <textarea
      className={style.TextArea}
      ref={c => (link(c))}
      {...{ name, value, placeholder, onChange, onBlur, onKeyDown }}
    />
  );
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  link: PropTypes.func,
  type: PropTypes.string
};
