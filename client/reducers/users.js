import { createAction } from 'redux-actions';
import { select, put, fork, takeEvery } from 'redux-saga/effects';
import { merge } from '../helpers/ramda';

import User from '../api/user';

const userModel = new User();


const USERS_UPDATE = 'USERS_UPDATE';
const USERS_RESTORE = 'USERS_RESTORE';
const USERS_LIST = 'USERS_LIST';

const $$initialState = {};

export default function users($$state = $$initialState, { type, payload }) {
  switch (type) {
    case USERS_UPDATE:
      return merge($$state, payload);
    case USERS_RESTORE:
      return payload;
    default:
      return $$state;
  }
}

export const usersUpdate = createAction(USERS_UPDATE);

export const usersRestore = createAction(USERS_RESTORE);

export const usersList = createAction(USERS_LIST);

function getUsers(state) {
  return state.users;
}

export function* usersListAction({ payload }) {
  const existsUser = yield select(getUsers);
  const usersList = payload.filter((id) => !existsUser[id]);
  const users = yield userModel.list(usersList);
  const data = users.reduce((state, user) => ({
    ...state,
    [user.id]: user
  }), {});
  yield put(usersUpdate(data));
}

export function* usersWatcher() {
  yield fork(takeEvery, USERS_LIST, usersListAction);
}
