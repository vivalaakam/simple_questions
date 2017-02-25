import { LOCATION_CHANGE } from 'react-router-redux';
import { fork, take, cancel } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import list, { getTodosWatcher } from './list';
import filter from './filter';

export default function todos(...props) {
  return combineReducers({
    filter,
    list
  })(...props);
}

if (!todos.name) {
  todos.name = 'todos';
}

function* todosData() {
  const watcher = yield fork(getTodosWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export const sagas = [
  todosData
];
