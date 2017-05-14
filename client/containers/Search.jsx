import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import QuestionsSearchWidget from '../components/Questions/Search';
import { searchQuestions, searchToggleQuestions, searchClearQuestions } from '../reducers/questions/search';

const mapStateToProps = state => ({
  search: state.questions.search,
});

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({
    searchQuestions,
    searchClearQuestions,
    searchFocusQuestions() {
      return dispatch(searchToggleQuestions(true));
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
  search: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, actionsDispatch)(QuestionsSearchContainer);
