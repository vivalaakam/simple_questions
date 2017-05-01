import { createAction } from 'redux-actions';
import { put, select, takeLatest, fork } from 'redux-saga/effects';
import { merge } from '../helpers/ramda';

const MODAL_SHOW = 'SHOW_MODAL';
const MODAL_HIDE = 'HIDE_MODAL';
const MODAL_REJECT = 'MODAL_REJECT';
const MODAL_RESOLVE = 'MODAL_RESOLVE';
const MODAL_ACTION_REJECT = 'MODAL_ACTION_REJECT';
const MODAL_ACTION_RESOLVE = 'MODAL_ACTION_RESOLVE';

const $$initialState = {
  type: null,
  props: {},
  resolveInAction: false,
  rejectInAction: false,
  resolveAction: () => {
  },
  rejectAction: () => {
  }
};

export default function modal($$state = $$initialState, { type, payload }) {
  switch (type) {
    case MODAL_SHOW:
      return payload;
    case MODAL_HIDE:
      return $$initialState;
    case MODAL_REJECT:
      return merge($$state, { rejectAction: payload });
    case MODAL_RESOLVE:
      return merge($$state, { resolveAction: payload });
    default:
      return $$state;
  }
}

export const hideModal = createAction(MODAL_HIDE);

export const showModal = createAction(MODAL_SHOW);

export const resolveModal = createAction(MODAL_RESOLVE);

export const rejectModal = createAction(MODAL_REJECT);

export const resolveActionModal = createAction(MODAL_ACTION_RESOLVE);

export const rejectActionModal = createAction(MODAL_ACTION_REJECT);

function getModal(state) {
  return state.modal;
}

function* resolveModalAction({ payload }) {
  const current = yield select(getModal);
  yield put(resolveModal(true));
  if (current.resolveAction) {
    try {
      yield current.resolveAction(payload);
    } catch (e) {
      yield put(resolveModal(false));
    }
  }
  yield put(hideModal());
}

function* rejectModalAction({ payload }) {
  const current = yield select(getModal);
  yield put(rejectModal(true));
  if (current.rejectAction) {
    try {
      current.rejectAction(payload);
      yield put(hideModal());
    } catch (e) {
      yield put(rejectModal(false));
    }
  }
}

export function* modalData() {
  yield fork(takeLatest, MODAL_ACTION_RESOLVE, resolveModalAction);
  yield fork(takeLatest, MODAL_ACTION_REJECT, rejectModalAction);
}
