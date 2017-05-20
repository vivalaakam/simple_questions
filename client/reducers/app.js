import { put, select, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { merge } from '../helpers/ramda';

import { resetSearchQuestions } from './questions/search';

import Questions from '../api/questions';

const apiQuestions = new Questions();

const APP_SEARCH = 'APP_SEARCH';
const APP_SEARCH_RESET = 'APP_SEARCH_RESET';
const APP_SEARCH_CLEAR = 'APP_SEARCH_CLEAR';
const APP_SEARCH_TOGGLE = 'APP_SEARCH_TOGGLE';

const $$initialState = {
  search: '',
  searchActive: false,
  notificationsActive: false
};

export default function search($$state = $$initialState, { type, payload }) {
  switch (type) {
    case APP_SEARCH_RESET:
      return merge($$state, payload);
    default:
      return $$state;
  }
}

export const searchApp = createAction(APP_SEARCH);

export const searchClearApp = createAction(APP_SEARCH_CLEAR);

export const searchToggleApp = createAction(APP_SEARCH_TOGGLE);

export const resetSearchApp = createAction(APP_SEARCH_RESET);

export function getApp(state) {
  return state.app;
}

export function* searchAppAction({ payload }) {
  yield put(resetSearchApp({
    search: payload
  }));
  const questionsList = yield apiQuestions.search(payload);
  yield put(resetSearchQuestions(questionsList));
}

export function* searchToggleAppAction({ payload }) {
  yield put(resetSearchApp({
    searchActive: payload
  }));
}

export function * searchClearAppAction() {
  yield put(resetSearchApp($$initialState));
  yield put(resetSearchQuestions([]));
}

export function* getAppWatcher() {
  yield takeLatest(APP_SEARCH, searchAppAction);
  yield takeLatest(APP_SEARCH_CLEAR, searchClearAppAction);
  yield takeLatest(APP_SEARCH_TOGGLE, searchToggleAppAction);
}
