import { put, fork, takeLatest, call, select } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { resolveActionModal } from './modal';
import { merge } from '../helpers/ramda';
import Auth from '../api/auth';
import User from '../api/user';

import token from '../utils/token';
import sw from '../utils/serviceWorker';

const apiAuth = new Auth();
const apiUser = new User();

const AUTH_CURRENT = 'AUTH_CURRENT';
const AUTH_CHANGE = 'AUTH_CHANGE';
const AUTH_UPDATE = 'AUTH_UPDATE';
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
    case AUTH_CHANGE:
      return merge($$state, payload);
    default:
      return $$state;
  }
}

export const fetchAuth = createAction(AUTH_FETCH);

export const changeAuth = createAction(AUTH_CHANGE);

export const updateAuth = createAction(AUTH_UPDATE);

export const currentAuth = createAction(AUTH_CURRENT);

export const errorAuth = createAction(AUTH_ERROR);

export const authentificate = createAction(AUTH_AUTHENTIFICATE);

export const applyAuth = createAction(AUTH_APPLY);

export const logout = createAction(AUTH_LOGOUT);

function getUser(state) {
  return state.auth;
}

function* fetchAuthAction() {
  const data = yield apiUser.fetch();
  yield put(currentAuth({ ...data, tmp_last_name: data.last_name, tmp_first_name: data.last_name }));
}

function* authentificateAction({ payload: { email, password } }) {
  try {
    const user = yield apiAuth.auth({ email, password });
    yield put(applyAuth(user));
  } catch (e) {
    yield put(errorAuth(e.message));
  }
}

function* applyAuthAction({ payload }) {
  yield put(currentAuth({ ...payload, tmp_last_name: payload.last_name, tmp_first_name: payload.first_name }));
  sw.subscribeUser(token.getRawToken());
  yield put(resolveActionModal());
}

function* logoutAction() {
  yield apiAuth.logout();
  yield put(currentAuth($$initialState));
  sw.unsubscribeUser();
  token.removeToken();
}

function* updateUserAction() {
  const { tmp_first_name, tmp_last_name } = yield select(getUser);
  const data = yield apiUser.update({ first_name: tmp_first_name, last_name: tmp_last_name });
  yield put(currentAuth({ ...data, tmp_last_name: data.last_name, tmp_first_name: data.last_name }));
}

function* authWatcher() {
  yield fork(takeLatest, AUTH_APPLY, applyAuthAction);
  yield fork(takeLatest, AUTH_UPDATE, updateUserAction);
  yield fork(takeLatest, AUTH_FETCH, fetchAuthAction);
  yield fork(takeLatest, AUTH_AUTHENTIFICATE, authentificateAction);
  yield fork(takeLatest, AUTH_LOGOUT, logoutAction);
}

export function* authData() {
  yield fork(authWatcher);
}
