import { put, call, fork, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';

import Questions from '../../api/questions';

const apiQuestions = new Questions();

const QUESTIONS_FETCH = Symbol('QUESTIONS_FETCH');
const QUESTIONS_RESET = Symbol('QUESTIONS_RESET');

const $$initialState = [];

export default function list($$state = $$initialState, { type, payload }) {
  switch (type) {
    case QUESTIONS_RESET:
      return payload;
    default:
      return $$state;
  }
}

export const fetchQuestions = createAction(QUESTIONS_FETCH);

export const resetQuestions = createAction(QUESTIONS_RESET);


export function* fetchQuestionsAction() {
  const questionsList = yield apiQuestions.all();
  yield put(resetQuestions(questionsList));
}

export function* getQuestionsWatcher() {
  yield call(fetchQuestionsAction);
}
