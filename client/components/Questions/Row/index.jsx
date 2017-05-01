import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import style from './Row.scss';

export { style };

export default function QuestionsRow({ question }) {
  const className = classnames(style.QuestionsRow, { [style.completed]: question.completed });
  return (
    <div className={className}>
      <Link className={style.mainCell} to={`/${question.id}`}>
        <h3>{question.title}</h3>
        <p>{question.text}</p>
      </Link>
    </div>
  );
}

QuestionsRow.propTypes = {
  question: PropTypes.object.isRequired
};
