import { put, select, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { merge } from '../../helpers/ramda';

import Questions from '../../api/questions';

const apiQuestions = new Questions();

const QUESTIONS_SEARCH = 'QUESTIONS_SEARCH';
const QUESTIONS_SEARCH_RESET = 'QUESTIONS_SEARCH_RESET';
const QUESTIONS_SEARCH_CLEAR = 'QUESTIONS_SEARCH_CLEAR';
const QUESTIONS_SEARCH_TOGGLE = 'QUESTIONS_SEARCH_TOGGLE';

const $$initialState = {
  search: '',
  isActive: false,
  data: []
};

export default function search($$state = $$initialState, { type, payload }) {
  switch (type) {
    case QUESTIONS_SEARCH_RESET:
      return merge($$state, payload);
    default:
      return $$state;
  }
}

export const searchQuestions = createAction(QUESTIONS_SEARCH);

export const searchClearQuestions = createAction(QUESTIONS_SEARCH_CLEAR);

export const searchToggleQuestions = createAction(QUESTIONS_SEARCH_TOGGLE);

export const resetSearchQuestions = createAction(QUESTIONS_SEARCH_RESET);

export function getQuestionsSearch(state) {
  return state.questions.search;
}

export function* searchQuestionsAction({ payload }) {
  yield put(resetSearchQuestions({
    search: payload
  }));
  const questionsList = yield apiQuestions.search(payload);
  yield put(resetSearchQuestions({
    data: questionsList
  }));
}

export function* searchToggleQuestionsAction({ payload }) {
  yield put(resetSearchQuestions({
    isActive: payload
  }));
}

export function * searchClearQuestionsAction() {
  yield put(resetSearchQuestions($$initialState));
}

export function* getQuestionsSearchWatcher() {
  yield takeLatest(QUESTIONS_SEARCH, searchQuestionsAction);
  yield takeLatest(QUESTIONS_SEARCH_CLEAR, searchClearQuestionsAction);
  yield takeLatest(QUESTIONS_SEARCH_TOGGLE, searchToggleQuestionsAction);
}
