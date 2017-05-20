import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  toggleAdditionQuestion,
  createAdditionQuestion,
  closeQuestion,
  changeQuestion,
  createAnswerQuestion
} from '../reducers/questions/question';

import QuestionViewWidget from '../components/Questions/View';

const mapStateToProps = state => ({
  question: state.questions.question,
  users: state.users,
  auth: state.auth
});

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({
    toggleAdditionQuestion,
    createAdditionQuestion,
    createAnswerQuestion,
    closeQuestion,
    changeQuestion
  }, dispatch),
  dispatch
});

function QuestionCreateContainer({ question, auth, actions, users }) {
  return (
    <QuestionViewWidget {...{ question, auth, actions, users }} />
  );
}

QuestionCreateContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  users: PropTypes.object
};

QuestionCreateContainer.defaultProps = {
  users: {}
};

export default connect(mapStateToProps, actionsDispatch)(QuestionCreateContainer);
