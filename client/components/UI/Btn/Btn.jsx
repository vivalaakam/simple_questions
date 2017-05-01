import React, { PropTypes } from 'react';
import classnames from 'classnames';
import style from './Btn.scss';

export default function Btn({ children, className, onClick, name, active, inverted, disabled, scheme }) {
  const cName = classnames(style.Btn, style[`${scheme}Scheme`], className, {
    [style.active]: active,
    [style.inverted]: inverted
  });
  return (
    <button className={cName} {...{ name, disabled, onClick }}>{children}</button>
  );
}

Btn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]).isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  inverted: PropTypes.bool,
  scheme: PropTypes.oneOf(['default', 'green', 'blue', 'orange', 'github'])
};

Btn.defaultProps = {
  scheme: 'default',
  name: '',
  className: '',
  disabled: false,
  inverted: false,
  active: false
};
