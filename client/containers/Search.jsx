import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import QuestionsSearchWidget from '../components/Questions/Search';
import { searchApp, searchToggleApp, searchClearApp } from '../reducers/app';

const mapStateToProps = state => ({
  search: state.questions.search,
  app: state.app
});

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({
    searchApp,
    searchClearApp,
    searchFocusQuestions() {
      return dispatch(searchToggleApp(true));
    }
  }, dispatch),
  dispatch
});

function QuestionsSearchContainer(props) {
  return (
    <QuestionsSearchWidget {...props} />
  );
}

QuestionsSearchContainer.propTypes = {
  search: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, actionsDispatch)(QuestionsSearchContainer);
