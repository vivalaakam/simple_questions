import { createAction } from 'redux-actions';
import { put, select, take, call } from 'redux-saga/effects';
import { append, removeByKey } from '../helpers/ramda';
import Socket from '../api/socket';

const NOTIFICATION_CREATE = 'NOTIFICATION_CREATE';
const NOTIFICATION_REMOVE = 'NOTIFICATION_REMOVE';

const $$initialState = [];

export default function modal($$state = $$initialState, { type, payload }) {
  switch (type) {
    case NOTIFICATION_CREATE:
      return append($$state, payload);
    case NOTIFICATION_REMOVE:
      return removeByKey($$state, payload.uid, 'uid');
    default:
      return $$state;
  }
}

export const createNotification = createAction(NOTIFICATION_CREATE);
export const removeNotification = createAction(NOTIFICATION_REMOVE);

export function* notificationsData() {
  const socketChannel = yield call(::Socket.subscribe, 'NotificationChannel');

  while (true) {
    const payload = yield take(socketChannel);
    if (payload.message) {
      yield put(createNotification(payload.message));
    }
  }
}
