import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import Btn from '../../UI/Btn/Btn';
import Row from '../Row';
import { FILTER_ALL, FILTER_COMPLETED, FILTER_ACTIVE } from '../../../reducers/questions/filter';
import style from './List.scss';
import LoggedIn from '../../../containers/LoggedIn';

const FILTER_TITLES = {
  [FILTER_ALL]: 'All',
  [FILTER_ACTIVE]: 'Active',
  [FILTER_COMPLETED]: 'Completed'
};

const QUESTION_FILTERS = {
  [FILTER_ALL]: () => true,
  [FILTER_ACTIVE]: question => !question.completed,
  [FILTER_COMPLETED]: question => question.completed
};

export default class QuestionsList extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    list: PropTypes.array.isRequired,
    filter: PropTypes.symbol.isRequired,
    users: PropTypes.object.isRequired
  };

  handleShow(filter) {
    this.props.actions.setFilter(filter);
  }

  renderFilter() {
    const { filter: selectedFilter } = this.props;

    return [FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED].map((filter, i) => {
      const title = FILTER_TITLES[filter];
      return (
        <li key={i} className={style.filterItem}>
          <Btn onClick={() => this.handleShow(filter)} inverted active={selectedFilter === filter}>
            {title}
          </Btn>
        </li>
      );
    });
  }

  renderQuestionItem = (question) => {
    return <Row key={question.id} question={question} user={this.props.users[question.user_id]} />;
  };

  renderQuestionCount(completed) {
    const { list } = this.props;
    const activeCount = list.length - completed;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className={style.questionCount}>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderCreateButton() {
    return (
      <div className={style.add}>
        <Link to="/create">Создать вопрос</Link>
      </div>
    );
  }

  render() {
    const { list, filter } = this.props;
    const filteredQuestions = list.filter(QUESTION_FILTERS[filter]);
    const completed = list.reduce((count, question) => (question.completed ? count + 1 : count), 0);
    return (
      <div className={style.QuestionsList}>
        <div className={style.navigation}>
          <div className={style.filter}>
            <ul className={style.filters}>
              {this.renderFilter()}
            </ul>
          </div>
          <LoggedIn success={this.renderCreateButton} />
        </div>
        <div className={style.table}>
          {filteredQuestions.map(::this.renderQuestionItem)}
        </div>
        <div className={style.navigation}>
          <div className={style.counter}>
            {this.renderQuestionCount(completed)}
          </div>
        </div>
      </div>
    );
  }
}
