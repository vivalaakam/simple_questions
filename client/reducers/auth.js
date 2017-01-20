import { put, fork, takeLatest, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { createAction } from 'redux-actions';
import { merge } from '../helpers/ramda';
import Auth from '../api/auth';

const apiAuth = new Auth();

const AUTH_CURRENT = Symbol('AUTH_CURRENT');
const AUTH_ERROR = Symbol('AUTH_ERROR');
const AUTH_FETCH = Symbol('AUTH_FETCH');
const AUTH_APPLY = Symbol('AUTH_APPLY');
const AUTH_AUTHENTIFICATE = Symbol('AUTH_AUTHENTIFICATE');

const $$initialState = {};

export default function auth($$state = $$initialState, { type, payload }) {
  switch (type) {
    case AUTH_CURRENT:
      return payload;
    case AUTH_ERROR:
      return merge($$state, { error: payload });
    default:
      return $$state;
  }
}

const fetchAuth = createAction(AUTH_FETCH);

const currentAuth = createAction(AUTH_CURRENT);

const errorAuth = createAction(AUTH_ERROR);

const authentificate = createAction(AUTH_AUTHENTIFICATE);

const applyAuth = createAction(AUTH_APPLY);

function* fetchAuthAction() {
  const data = yield apiAuth.current();
  yield put(currentAuth(data));
}

function* authentificateAction({ payload: { username, password } }) {
  try {
    const user = yield apiAuth.auth({ username, password });
    yield call(applyAuth, user);
  } catch (e) {
    yield put(errorAuth(e.message));
  }
}

function* applyAuthAction({ payload }) {
  yield put(currentAuth(payload));
  yield put(push('/'));
}

function* authWatcher() {
  yield fork(takeLatest, AUTH_APPLY, applyAuthAction);
  yield fork(takeLatest, AUTH_FETCH, fetchAuthAction);
  yield fork(takeLatest, AUTH_AUTHENTIFICATE, authentificateAction);
}

export function* authData() {
  yield fork(authWatcher);
}

export {
  fetchAuth, authentificate, errorAuth, applyAuth
};
