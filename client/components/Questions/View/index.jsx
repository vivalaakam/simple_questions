import React, { PureComponent, PropTypes } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import { Btn, Inp, TextArea } from '../../UI';
import style from './View.scss';
import pluralize from '../../../utils/pluralize';

moment.locale('ru');

export default class QuestionView extends PureComponent {
  static propTypes = {
    question: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  onClickAddition = () => {
    this.props.actions.toggleAdditionQuestion();
  };

  onClickSaveAddition = () => {
    this.props.actions.createAdditionQuestion();
  };

  onClickCancelAddition = () => {
    this.props.actions.toggleAdditionQuestion();
  };

  onClickSaveAnswer = () => {
    this.props.actions.createAnswerQuestion();
  };

  onChangeAdditionText = () => {
    this.props.actions.changeQuestion({
      additionText: this.text.value
    });
  };

  onChangeAnswerText = () => {
    this.props.actions.changeQuestion({
      answerText: this.answer.value
    });
  }

  setRefAddition = (link) => {
    this.text = link;
  };

  setRefAnswer = (link) => {
    this.answer = link;
  };

  text;
  answer;

  renderAdditionButton() {
    const { auth, question } = this.props;

    if (question.is_answered) {
      return null;
    }

    if (question.user_id !== auth.id) {
      const subscribed = question.subscription_ids.indexOf(auth.id) > -1;

      if (subscribed) {
        return (
          <div className={style.additionButton}>
            <Btn onClick={this.props.actions.unsubscribeQuestion}>Отписаться</Btn>
          </div>
        );
      }

      return (
        <div className={style.additionButton}>
          <Btn onClick={this.props.actions.subscribeQuestion}>Подписаться</Btn>
        </div>
      );
    }

    return (
      <div className={style.additionButton}>
        <Btn onClick={this.onClickAddition}>Дополнить вопрос</Btn>
      </div>
    );
  }

  renderAdditionForm() {
    const { question } = this.props;

    if (!question.addition || question.is_answered) {
      return null;
    }

    return (
      <div>
        <div className={style.row}>
          <Inp
            className={style.inp}
            name="additionText"
            value={question.additionText}
            onChange={this.onChangeAdditionText}
            link={this.setRefAddition}
            placeholder="Дополнить вопрос"
          />
        </div>
        <div className={style.row}>
          <Btn onClick={this.onClickSaveAddition}>Дополнить вопрос</Btn>
          <Btn onClick={this.onClickCancelAddition}>Отмена</Btn>
        </div>
      </div>
    );
  }

  renderAdditions() {
    const { question } = this.props;

    if (!question.additions) {
      return null;
    }

    return question.additions.map((addition, index) => (
      <div key={addition.id} className={style.row}>
        <p className={style.addition}>Дополнение #{index + 1}: {moment(addition.created_at).fromNow()}</p>
        <p>{addition.text}</p>
      </div>
    ));
  }

  renderCommentTitle() {
    const { question } = this.props;
    if (!(question.answers && question.answers.length)) {
      return (
        <h2>Пока нет ответов на вопрос</h2>
      );
    }

    const length = question.answers.length;

    const count = pluralize(length, ['ответ', 'ответа', 'ответов']);

    return (
      <h2>{length} {count} на вопрос</h2>
    );
  }

  renderCommentForm() {
    const { auth, question } = this.props;
    if (!auth.id || question.is_answered || question.user_id === auth.id) {
      return null;
    }

    return (
      <div>
        <div className={style.row}>
          <TextArea
            className={style.inp}
            name="answerText"
            value={question.answerText}
            onChange={this.onChangeAnswerText}
            link={this.setRefAnswer}
            placeholder="Ответить на вопрос"
          />
        </div>
        <div className={style.row}>
          <Btn onClick={this.onClickSaveAnswer}>Ответить на вопрос</Btn>
        </div>
      </div>
    );
  }

  renderComments() {
    const { question, users } = this.props;

    if (!question.answers) {
      return null;
    }

    return question.answers.map(answer => (
      <div key={answer.id} className={classnames(style.answer, { [style.isAnswer]: answer.is_answer })}>
        <p className={style.addition}>{(users[answer.user_id] || {}).name}</p>
        <p className={style.addition}>{moment(answer.created_at).fromNow()}</p>
        <p>{answer.text}</p>
        {this.renderCommentClose(answer)}
      </div>
    ));
  }

  renderCommentClose(answer) {
    const { auth, question } = this.props;

    if (question.user_id !== auth.id || question.is_answered) {
      return null;
    }

    const onClick = () => {
      this.props.actions.closeQuestion(answer);
    };

    return (
      <Btn scheme="green" onClick={onClick}>Ответ на вопрос</Btn>
    );
  }

  render() {
    const { question } = this.props;
    return (
      <div className={style.QuestionView}>
        <div className={style.titleRow}>
          <h1 className={style.title}>{question.title}</h1>
          {this.renderAdditionButton()}
        </div>
        <div className={style.question}>
          <p>{question.text}</p>
          {this.renderAdditions()}
          {this.renderAdditionForm()}
        </div>
        {this.renderCommentTitle()}
        {this.renderComments()}
        {this.renderCommentForm()}
      </div>
    );
  }
}
