import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import QuestionViewWidget from '../components/Questions/View';

const mapStateToProps = state => ({
  question: state.questions.question
});

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({}, dispatch),
  dispatch
});

function QuestionCreateContainer({ question, actions }) {
  return (
    <QuestionViewWidget {...{ question, actions }} />
  );
}

QuestionCreateContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  question: PropTypes.object
};

export default connect(mapStateToProps, actionsDispatch)(QuestionCreateContainer);
