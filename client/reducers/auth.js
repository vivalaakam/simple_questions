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
const AUTH_UPDATE_PASSWORD = 'AUTH_UPDATE_PASSWORD';
const AUTH_ERROR = 'AUTH_ERROR';
const AUTH_FETCH = 'AUTH_FETCH';
const AUTH_APPLY = 'AUTH_APPLY';
const AUTH_AUTHENTIFICATE = 'AUTH_AUTHENTIFICATE';
const AUTH_LOGOUT = 'AUTH_LOGOUT';
const AUTH_TOKEN_REMOVE = 'AUTH_TOKEN_REMOVE';
const AUTH_NOTIFICATION_REMOVE = 'AUTH_NOTIFICATION_REMOVE';

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

export const updatePasswordAuth = createAction(AUTH_UPDATE_PASSWORD);

export const currentAuth = createAction(AUTH_CURRENT);

export const errorAuth = createAction(AUTH_ERROR);

export const authentificate = createAction(AUTH_AUTHENTIFICATE);

export const applyAuth = createAction(AUTH_APPLY);

export const logout = createAction(AUTH_LOGOUT);

export const tokenRemove = createAction(AUTH_TOKEN_REMOVE);

export const notificationRemove = createAction(AUTH_NOTIFICATION_REMOVE);

function getUser(state) {
  return state.auth;
}

function* fetchAuthAction({ payload }) {
  const data = yield apiUser.fetch(payload);
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

function* removeTokenAction({ payload }) {
  const data = yield apiUser.removeToken(payload.id);
  console.log(data);
  yield put(currentAuth({ ...data, tmp_last_name: data.last_name, tmp_first_name: data.last_name }));
}

function* removeNotificationAction({ payload }) {
  const data = yield apiUser.removeNotification(payload.id);
  yield put(currentAuth({ ...data, tmp_last_name: data.last_name, tmp_first_name: data.last_name }));
}

function* updateUserPasswordAction() {
  const { password, password_confirmation } = yield select(getUser);
  if (password === password_confirmation) {
    yield put(changeAuth({ wrongPassword: false, smallPassword: false }));
    if (password.length < 8) {
      yield put(changeAuth({ smallPassword: true }));
      return;
    }
    const data = yield apiUser.password({ password, password_confirmation });
    yield put(currentAuth({
      ...data,
      tmp_last_name: data.last_name,
      tmp_first_name: data.last_name,
      password: '',
      password_confirmation: ''
    }));
  } else {
    yield put(changeAuth({ wrongPassword: true }));
  }
}

function* authWatcher() {
  yield fork(takeLatest, AUTH_APPLY, applyAuthAction);
  yield fork(takeLatest, AUTH_UPDATE, updateUserAction);
  yield fork(takeLatest, AUTH_UPDATE_PASSWORD, updateUserPasswordAction);
  yield fork(takeLatest, AUTH_FETCH, fetchAuthAction);
  yield fork(takeLatest, AUTH_AUTHENTIFICATE, authentificateAction);
  yield fork(takeLatest, AUTH_LOGOUT, logoutAction);
  yield fork(takeLatest, AUTH_TOKEN_REMOVE, removeTokenAction);
  yield fork(takeLatest, AUTH_NOTIFICATION_REMOVE, removeNotificationAction);
}

export function* authData() {
  yield fork(authWatcher);
}
