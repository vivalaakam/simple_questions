import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import reducer, { sagas } from '../reducers/todos';

import TodosWidget from '../components/Todos/List';
import { setFilter } from '../reducers/todos/filter';
import { showModal } from '../reducers/modal';
import {
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  clearCompletedTodos
} from '../reducers/todos/list';

const mapStateToProps = state => ({
  todos: state.todos
});

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({
    updateTodo,
    createTodo,
    deleteTodo,
    clearCompletedTodos,
    toggleTodo,
    setFilter,
    showModal
  }, dispatch),
  dispatch
});

function Todos({ todos: { list, filter }, actions }) {
  return (
    <TodosWidget {...{ list, filter, actions }} />
  );
}

Todos.propTypes = {
  actions: PropTypes.object.isRequired,
  todos: PropTypes.object
};

export default connect(mapStateToProps, actionsDispatch)(Todos);

export {
  reducer, sagas
};
