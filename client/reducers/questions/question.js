import uuid4 from 'uuid/v4';
import { put, select, call, fork, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { push } from 'react-router-redux';

import { merge } from '../../helpers/ramda';

import Questions from '../../api/questions';

const apiQuestions = new Questions();

const QUESTION_CHANGE = 'QUESTION_CHANGE';
const QUESTION_DELETE = 'QUESTION_DELETE';
const QUESTION_DESTROY = 'QUESTION_DESTROY';
const QUESTION_CREATE = 'QUESTION_CREATE';
const QUESTION_UPDATE = 'QUESTION_UPDATE';
const QUESTION_RESET = 'QUESTION_RESET';

export const $$initialState = {
  id: '',
  title: '',
  text: '',
  isNew: true
};

export const createQuestion = createAction(QUESTION_CREATE);

export const updateQuestion = createAction(QUESTION_UPDATE);

export const deleteQuestion = createAction(QUESTION_DELETE);

export const destroyQuestion = createAction(QUESTION_DESTROY);

export const resetQuestion = createAction(QUESTION_RESET);

export const changeQuestion = createAction(QUESTION_CHANGE);

export default function question($$state = $$initialState, { type, payload }) {
  switch (type) {
    case QUESTION_CHANGE:
      return merge($$state, payload);
    case QUESTION_DESTROY:
      return $$initialState;
    case QUESTION_RESET:
      return payload;
    default:
      return $$state;
  }
}

function getQuestion(state) {
  return state.questions.question;
}

function* createQuestionAction() {
  const data = yield select(getQuestion);
  const questionData = yield apiQuestions.create(data);
  yield put(resetQuestion(questionData));
  yield put(push(`/${questionData.id}`));
}

function* updateQuestionAction() {
  const { id, ...props } = yield select(getQuestion);
  const questionData = yield apiQuestions.update(id, props);
  yield put(resetQuestion(questionData));
}

function* deleteQuestionAction({ payload: { id } }) {
  yield apiQuestions.remove(id);
  yield put(destroyQuestion(id));
}

export function* fetchQuestionAction(id) {
  const questionData = yield apiQuestions.fetch(id);
  yield put(resetQuestion({ ...questionData, isNew: false }));
}

export function* resetQuestionInitial() {
  yield put(resetQuestion({ ...$$initialState, id: uuid4() }));
}

export function* getQuestionWatcher() {
  yield takeLatest(QUESTION_CREATE, createQuestionAction);
  yield takeLatest(QUESTION_UPDATE, updateQuestionAction);
  yield takeLatest(QUESTION_DELETE, deleteQuestionAction);
}
