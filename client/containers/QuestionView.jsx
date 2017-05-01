import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleAdditionQuestion, createAdditionQuestion, changeQuestion } from '../reducers/questions/question';

import QuestionViewWidget from '../components/Questions/View';

const mapStateToProps = state => ({
  question: state.questions.question,
  auth: state.auth
});

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({ toggleAdditionQuestion, createAdditionQuestion, changeQuestion }, dispatch),
  dispatch
});

function QuestionCreateContainer({ question, auth, actions }) {
  return (
    <QuestionViewWidget {...{ question, auth, actions }} />
  );
}

QuestionCreateContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, actionsDispatch)(QuestionCreateContainer);
