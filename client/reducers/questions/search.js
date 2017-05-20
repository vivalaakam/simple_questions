import { put, select, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';

import Questions from '../../api/questions';

const apiQuestions = new Questions();

const QUESTIONS_SEARCH_RESET = 'QUESTIONS_SEARCH_RESET';

const $$initialState = [];

export default function search($$state = $$initialState, { type, payload }) {
  switch (type) {
    case QUESTIONS_SEARCH_RESET:
      return payload;
    default:
      return $$state;
  }
}

export const resetSearchQuestions = createAction(QUESTIONS_SEARCH_RESET);

export function getQuestionsSearch(state) {
  return state.questions.search;
}

export function* searchQuestionsAction({ payload }) {
  const questionsList = yield apiQuestions.search(payload);
  yield put(resetSearchQuestions({
    data: questionsList
  }));
}


export function* getQuestionsSearchWatcher() {
}
