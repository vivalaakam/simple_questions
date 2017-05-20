import uuid4 from 'uuid/v4';
import _ from 'lodash';
import { put, select, call, fork, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { push } from 'react-router-redux';

import { usersListAction } from '../users';
import { getQuestionsSearch } from './search';
import { searchClearApp } from '../app';
import { merge } from '../../helpers/ramda';

import Questions from '../../api/questions';

const apiQuestions = new Questions();

const QUESTION_CHANGE = 'QUESTION_CHANGE';
const QUESTION_DELETE = 'QUESTION_DELETE';
const QUESTION_DESTROY = 'QUESTION_DESTROY';
const QUESTION_CREATE = 'QUESTION_CREATE';
const QUESTION_UPDATE = 'QUESTION_UPDATE';
const QUESTION_RESET = 'QUESTION_RESET';
const QUESTION_ADDITION_TOGGLE = 'QUESTION_ADDITION_TOGGLE';
const QUESTION_SUBSCRIBE = 'QUESTION_SUBSCRIBE';
const QUESTION_UNSUBSCRIBE = 'QUESTION_UNSUBSCRIBE';
const QUESTION_ADDITION_CREATE = 'QUESTION_ADDITION_CREATE';
const QUESTION_ANSWER_CREATE = 'QUESTION_ANSWER_CREATE';
const QUESTION_CLOSE = 'QUESTION_CLOSE';

export const $$initialState = {
  id: '',
  title: '',
  text: '',
  isNew: true,
  addition: false,
  additionText: '',
  answerText: '',
  additions: [],
  answers: []
};

export const createQuestion = createAction(QUESTION_CREATE);

export const updateQuestion = createAction(QUESTION_UPDATE);

export const deleteQuestion = createAction(QUESTION_DELETE);

export const destroyQuestion = createAction(QUESTION_DESTROY);

export const resetQuestion = createAction(QUESTION_RESET);

export const changeQuestion = createAction(QUESTION_CHANGE);

export const toggleAdditionQuestion = createAction(QUESTION_ADDITION_TOGGLE);

export const subscribeQuestion = createAction(QUESTION_SUBSCRIBE);

export const unsubscribeQuestion = createAction(QUESTION_UNSUBSCRIBE);

export const createAdditionQuestion = createAction(QUESTION_ADDITION_CREATE);

export const createAnswerQuestion = createAction(QUESTION_ANSWER_CREATE);

export const closeQuestion = createAction(QUESTION_CLOSE);

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
  const { additionText, answerText, ...data } = yield select(getQuestion);
  const questionData = yield apiQuestions.create(data);
  yield put(resetQuestion(questionData));
  yield put(push(`/${questionData.id}`));
}

function* updateQuestionAction() {
  const { id, additionText, answerText, ...props } = yield select(getQuestion);
  const questionData = yield apiQuestions.update(id, props);
  yield put(resetQuestion(questionData));
}

function* createAdditionQuestionAction() {
  const { id, additionText } = yield select(getQuestion);
  const questionData = yield apiQuestions.addition(id, { text: additionText });
  yield put(resetQuestion({ ...questionData, additionText: '' }));
}

function* createAnswerQuestionAction() {
  const { id, answerText } = yield select(getQuestion);
  const questionData = yield apiQuestions.answer(id, { text: answerText });
  yield put(resetQuestion({ ...questionData, answerText: '' }));
}

function* closeQuestionAction({ payload }) {
  const { id } = yield select(getQuestion);
  const questionData = yield apiQuestions.close(id, payload.id);
  yield put(resetQuestion(questionData));
}

function* subscribeQuestionAction() {
  const { id } = yield select(getQuestion);
  const questionData = yield apiQuestions.subscribe(id);
  yield put(resetQuestion(questionData));
}

function* unsubscribeQuestionAction() {
  const { id } = yield select(getQuestion);
  const questionData = yield apiQuestions.unsubscribe(id);
  yield put(resetQuestion(questionData));
}

function* deleteQuestionAction({ payload: { id } }) {
  yield apiQuestions.remove(id);
  yield put(destroyQuestion(id));
}

function* toggleAdditionQuestionAction() {
  const { addition } = yield select(getQuestion);
  yield put(changeQuestion({ addition: !addition }));
}

export function* fetchQuestionAction(id) {
  const questionData = yield apiQuestions.fetch(id);

  const users = questionData.answers.map(answer => answer.user_id);
  users.push(questionData.user_id);
  yield call(usersListAction, { payload: _.uniq(users) });

  yield put(resetQuestion({ ...questionData, isNew: false, additionText: '', answerText: '' }));
}

export function* resetQuestionInitial() {
  const { search } = yield select(getQuestionsSearch);
  yield put(resetQuestion({ ...$$initialState, id: uuid4(), title: search }));
  yield put(searchClearApp());
}

export function* getQuestionWatcher() {
  yield takeLatest(QUESTION_CREATE, createQuestionAction);
  yield takeLatest(QUESTION_UPDATE, updateQuestionAction);
  yield takeLatest(QUESTION_DELETE, deleteQuestionAction);
  yield takeLatest(QUESTION_ADDITION_TOGGLE, toggleAdditionQuestionAction);
  yield takeLatest(QUESTION_SUBSCRIBE, subscribeQuestionAction);
  yield takeLatest(QUESTION_UNSUBSCRIBE, unsubscribeQuestionAction);
  yield takeLatest(QUESTION_ADDITION_CREATE, createAdditionQuestionAction);
  yield takeLatest(QUESTION_ANSWER_CREATE, createAnswerQuestionAction);
  yield takeLatest(QUESTION_CLOSE, closeQuestionAction);
}
