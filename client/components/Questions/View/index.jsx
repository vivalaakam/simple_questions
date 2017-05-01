import React, { PureComponent, PropTypes } from 'react';

import style from './View.scss';

export default class QuestionView extends PureComponent {
  static propTypes = {
    question: PropTypes.object.isRequired
  };

  render() {
    const { question } = this.props
    return (
      <div className={style.QuestionView}>
        <h1>{question.title}</h1>
        <p>{question.text}</p>
      </div>
    );
  }
}
