import { put, call, fork, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';

import { append, removeByKey, replace } from '../../helpers/ramda';
import Todos from '../../api/todos';

const apiTodos = new Todos();

const TODO_DELETE = Symbol('TODO_DELETE');
const TODO_DESTROY = Symbol('TODO_DESTROY');
const TODO_TOGGLE = Symbol('TODO_TOGGLE');
const TODO_CREATE = Symbol('TODO_CREATE');
const TODO_UPDATE = Symbol('TODO_UPDATE');
const TODO_RESET = Symbol('TODO_RESET');
const TODO_ADD = Symbol('TODO_ADD');
const TODOS_FETCH = Symbol('TODOS_FETCH');
const TODOS_RESET = Symbol('TODOS_RESET');
const TODOS_COMPLETE_ALL = Symbol('TODOS_COMPLETE_ALL');
const TODOS_CLEAR_COMPLETED = Symbol('TODOS_CLEAR_COMPLETED');

const $$initialState = [];

export default function list($$state = $$initialState, { type, payload }) {
  switch (type) {
    case TODO_ADD:
      return append($$state, payload);
    case TODO_DESTROY:
      return removeByKey($$state, payload);
    case TODO_RESET:
      return replace($$state, [payload]);
    case TODOS_RESET:
      return payload;
    default:
      return $$state;
  }
}

export const createTodo = createAction(TODO_CREATE);

export const addTodo = createAction(TODO_ADD);

export const updateTodo = createAction(TODO_UPDATE);

export const deleteTodo = createAction(TODO_DELETE);

export const destroyTodo = createAction(TODO_DESTROY);

export const resetTodo = createAction(TODO_RESET);

export const toggleTodo = createAction(TODO_TOGGLE);

export const fetchTodos = createAction(TODOS_FETCH);

export const resetTodos = createAction(TODOS_RESET);

export const completeAllTodos = createAction(TODOS_COMPLETE_ALL);

export const clearCompletedTodos = createAction(TODOS_CLEAR_COMPLETED);

function* createTodoAction({ payload }) {
  const todo = yield apiTodos.create(payload);
  yield put(addTodo(todo));
}

function* updateTodoAction({ payload: { id, text = '', completed = false } }) {
  const todo = yield apiTodos.update(id, { text, completed });
  yield put(resetTodo(todo));
}

function* deleteTodoAction({ payload: { id } }) {
  yield apiTodos.remove(id);
  yield put(destroyTodo(id));
}

function* fetchTodosAction() {
  const todosList = yield apiTodos.all();
  yield put(resetTodos(todosList));
}

function* toggleTodoAction({ payload: { id, text = '', completed = false } }) {
  yield put(updateTodo({ id, text, completed: !completed }));
}

function* completeAllTodosAction() {
  const todosList = yield apiTodos.completeAll();
  yield put(resetTodos(todosList));
}

function* clearCompletedTodosAction() {
  const todosList = yield apiTodos.clearCompleted();
  yield put(resetTodos(todosList));
}

export function* getTodosWatcher() {
  yield fork(takeLatest, TODO_CREATE, createTodoAction);
  yield fork(takeLatest, TODO_UPDATE, updateTodoAction);
  yield fork(takeLatest, TODO_DELETE, deleteTodoAction);
  yield fork(takeLatest, TODOS_COMPLETE_ALL, completeAllTodosAction);
  yield fork(takeLatest, TODOS_CLEAR_COMPLETED, clearCompletedTodosAction);
  yield fork(takeLatest, TODO_TOGGLE, toggleTodoAction);

  yield call(fetchTodosAction);
}
