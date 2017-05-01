import React, { PureComponent, PropTypes } from 'react';
import moment from 'moment';
import { Btn, Inp } from '../../UI';
import style from './View.scss';

moment.locale('ru');

export default class QuestionView extends PureComponent {
  static propTypes = {
    question: PropTypes.object.isRequired,
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

  onChangeAdditionText = () => {
    this.props.actions.changeQuestion({
      additionText: this.text.value
    });
  };

  setRefAddition = (link) => {
    this.text = link;
  };

  text;

  renderAdditionButton() {
    const { auth, question } = this.props;

    if (question.user_id !== auth.id) {
      return null;
    }

    return (
      <div className={style.additionButton}>
        <Btn onClick={this.onClickAddition}>Дополнить вопрос</Btn>
      </div>
    );
  }

  renderAdditionForm() {
    const { question } = this.props;

    if (!question.addition) {
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

    return question.additions.map((addition, index) => {
      return (
        <div key={addition.id} className={style.row}>
          <p className={style.addition}>Дополнение #{index + 1}: {moment(addition.created_at).fromNow()}</p>
          <p>{addition.text}</p>
        </div>
      );
    });
  }

  render() {
    const { question } = this.props;
    return (
      <div className={style.QuestionView}>
        <div className={style.titleRow}>
          <h1 className={style.title}>{question.title}</h1>
          {this.renderAdditionButton()}
        </div>
        <p>{question.text}</p>
        {this.renderAdditions()}
        {this.renderAdditionForm()}
      </div>
    );
  }
}
