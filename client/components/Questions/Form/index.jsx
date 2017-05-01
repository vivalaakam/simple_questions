import React, { Component, PropTypes } from 'react';

import { Inp, TextArea, Btn } from '../../UI';

import style from './Form.scss';

export default class QuestionForm extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  onSave = () => {
    if (this.props.question.isNew) {
      this.props.actions.createQuestion();
    } else {
      this.props.actions.updateQuestion();
    }
  };

  onCancel = () => {
    this.props.router.push('/');
  };

  onChangeTitle = () => {
    this.props.actions.changeQuestion({
      title: this.title.value
    });
  };

  onChangeText = () => {
    this.props.actions.changeQuestion({
      text: this.text.value
    });
  };

  setRefTitle = (link) => {
    this.title = link;
  };

  setRefText = (link) => {
    this.text = link;
  };

  getTitle() {
    const { question } = this.props;
    if (question.isNew) {
      return 'Создать вопрос';
    }

    return 'Редактировать вопрос';
  }

  text;
  title;

  render() {
    const { question } = this.props;
    return (
      <div className={style.QuestionForm}>
        <div className={style.row}>
          <h1>{this.getTitle()}</h1>
        </div>
        <div className={style.row}>
          <Inp
            className={style.inp}
            name="title"
            value={question.title}
            onChange={this.onChangeTitle}
            link={this.setRefTitle}
            placeholder="Заголовок вопроса"
          />
        </div>
        <div className={style.row}>
          <TextArea
            className={style.inp}
            name="text"
            value={question.text}
            onChange={this.onChangeText}
            link={this.setRefText}
            placeholder="Текст вопроса"
          />
        </div>
        <div className={style.row}>
          <Btn onClick={this.onSave}>
            Сохранить
          </Btn>
          <Btn onClick={this.onCancel}>
            Отмена
          </Btn>
        </div>
      </div>
    );
  }
}
