import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeQuestion, createQuestion, updateQuestion } from '../reducers/questions/question';

import QuestionFormWidget from '../components/Questions/Form';

const mapStateToProps = state => ({
  question: state.questions.question
});

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({
    changeQuestion,
    createQuestion,
    updateQuestion
  }, dispatch),
  dispatch
});

function QuestionCreateContainer({ question, actions, router }) {
  return (
    <QuestionFormWidget {...{ question, actions, router }} />
  );
}

QuestionCreateContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired
};

export default connect(mapStateToProps, actionsDispatch)(QuestionCreateContainer);
