import { put, fork, takeLatest, call } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { resolveActionModal } from './modal';
import { merge } from '../helpers/ramda';
import Auth from '../api/auth';
import token from '../utils/token';
import sw from '../utils/serviceWorker';

const apiAuth = new Auth();

const AUTH_CURRENT = 'AUTH_CURRENT';
const AUTH_ERROR = 'AUTH_ERROR';
const AUTH_FETCH = 'AUTH_FETCH';
const AUTH_APPLY = 'AUTH_APPLY';
const AUTH_AUTHENTIFICATE = 'AUTH_AUTHENTIFICATE';
const AUTH_LOGOUT = 'AUTH_LOGOUT';

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

export const fetchAuth = createAction(AUTH_FETCH);

export const currentAuth = createAction(AUTH_CURRENT);

export const errorAuth = createAction(AUTH_ERROR);

export const authentificate = createAction(AUTH_AUTHENTIFICATE);

export const applyAuth = createAction(AUTH_APPLY);

export const logout = createAction(AUTH_LOGOUT);

function* fetchAuthAction() {
  const data = yield apiAuth.current();
  yield put(currentAuth(data));
}

function* authentificateAction({ payload: { email, password } }) {
  try {
    const user = yield apiAuth.auth({ email, password });
    yield call(applyAuth, user);
    sw.subscribeUser(token.getRawToken());
    yield put(resolveActionModal());
  } catch (e) {
    yield put(errorAuth(e.message));
  }
}

function* applyAuthAction({ payload }) {
  yield put(currentAuth(payload));
  sw.subscribeUser(token.getRawToken());
  yield put(resolveActionModal());
}

function* logoutAction() {
  yield apiAuth.logout();
  yield put(currentAuth($$initialState));
  sw.unsubscribeUser();
  token.removeToken();
}

function* authWatcher() {
  yield fork(takeLatest, AUTH_APPLY, applyAuthAction);
  yield fork(takeLatest, AUTH_FETCH, fetchAuthAction);
  yield fork(takeLatest, AUTH_AUTHENTIFICATE, authentificateAction);
  yield fork(takeLatest, AUTH_LOGOUT, logoutAction);
}

export function* authData() {
  yield fork(authWatcher);
}
