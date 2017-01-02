import { createAction } from 'redux-actions';
import { LOCATION_CHANGE } from 'react-router-redux';

import { takeLatest, delay } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';

const GAME_START = Symbol('GAME_START');
const GAME_TOGGLE_ASYNC = Symbol('GAME_TOGGLE_ASYNC');
const GAME_FINISH = Symbol('GAME_FINISH');

const $$initialState = {
  in_progress: false
};

export default function game($$state = $$initialState, { type }) {
  switch (type) {
    case GAME_START:
      return { in_progress: true };
    case GAME_FINISH:
      return { in_progress: false };
    default:
      return $$state;
  }
}

if (!game.name) {
  game.name = 'game';
}

export const gameStart = createAction(GAME_START);
export const gameFinish = createAction(GAME_FINISH);
export const gameToggle = createAction(GAME_TOGGLE_ASYNC);

export function gameState(state) {
  return state.game.in_progress;
}

export function* runGameToggle() {
  yield call(delay, 1000);
  const state = yield select(gameState);
  if (state) {
    yield put(gameFinish());
  } else {
    yield put(gameStart());
  }
}

export function* getGameWatcher() {
  yield fork(takeLatest, GAME_TOGGLE_ASYNC, runGameToggle);
}

export function* gameData() {
  const watcher = yield fork(getGameWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export const sagas = [
  gameData
];
