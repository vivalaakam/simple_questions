import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import QuestionsWidget from '../components/Questions/List';
import { setFilter } from '../reducers/questions/filter';
import { showModal } from '../reducers/modal';

const mapStateToProps = state => ({
  questions: state.questions
});

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({
    setFilter,
    showModal
  }, dispatch),
  dispatch
});

function QuestionsContainer({ questions: { list, filter }, actions }) {
  return (
    <QuestionsWidget {...{ list, filter, actions }} />
  );
}

QuestionsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  questions: PropTypes.object
};

export default connect(mapStateToProps, actionsDispatch)(QuestionsContainer);
