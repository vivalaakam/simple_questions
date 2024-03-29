import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import { Inp } from '../../UI';

import style from './Search.scss';

export { style };

export default class QuestionsSearch extends PureComponent {
  static propTypes = {
    search: PropTypes.array.isRequired,
    app: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    className: PropTypes.string
  };


  onChangeSearch = () => {
    this.props.actions.searchApp(this.search.value);
  };

  setRefSearch = (link) => {
    this.search = link;
  };

  renderResults() {
    if (!(this.props.app.searchActive && this.props.app.search.length !== 0)) {
      return null;
    }

    const results = this.props.search.map((question) => {
      return (
        <Link
          className={style.resultRow}
          key={question.id}
          to={`/${question.id}`}
          onClick={this.props.actions.searchClearApp}
        >
          <h4>{question.title}</h4>
          <p>{question.text}</p>
        </Link>
      );
    });

    return (
      <div className={style.result}>
        {results}
        <Link className={style.resultRow} to="/create">
          <p>
            Создать вопрос <b>{this.props.app.search}</b>
          </p>
        </Link>
      </div>
    );
  }


  render() {
    const className = classnames(style.Search, this.props.className);

    return (
      <div className={className}>
        <Inp
          className={style.inp}
          name="search"
          placeholder="Поиск"
          onFocus={this.props.actions.searchFocusQuestions}
          value={this.props.app.search}
          onChange={this.onChangeSearch}
          link={this.setRefSearch}
        />
        {this.renderResults()}
      </div>
    );
  }
}
