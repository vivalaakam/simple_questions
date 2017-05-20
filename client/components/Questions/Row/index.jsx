import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import moment from 'moment';
import style from './Row.scss';
import pluralize from '../../../utils/pluralize';

moment.locale('ru');

export { style };

export default function QuestionsRow({ question, user }) {
  const className = classnames(style.QuestionsRow, { [style.completed]: question.completed });

  const answers = () => {
    if (!question.answers_count) {
      return (
        <p className={style.count}>Нет ответов</p>
      );
    }

    const count = pluralize(question.answers_count, ['ответ', 'ответа', 'ответов']);

    return (
      <p className={style.count}>
        {question.answers_count} {count}. Последний {moment(question.last_answer.created_at).fromNow()}
      </p>
    );
  };

  return (
    <div className={className}>
      <Link className={style.mainCell} to={`/${question.id}`}>
        <p className={style.count}>{user.name}</p>
        <p className={style.count}>{moment(question.created_at).fromNow()}</p>
        <h3>{question.title}</h3>
        <p>{question.text}</p>
        {answers()}
      </Link>
    </div>
  );
}

QuestionsRow.propTypes = {
  question: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
