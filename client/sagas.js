import { router } from 'redux-saga-router';
import { browserHistory as history } from 'react-router';
import { call } from 'redux-saga/effects';

import { usersWatcher } from './reducers/users';
import { notificationsData } from './reducers/notifications';
import { authData, fetchAuthAction } from './reducers/auth';
import { getAppWatcher } from './reducers/app';
import { modalData } from './reducers/modal';
import {
  getQuestionWatcher,
  getQuestionsSearchWatcher,
  fetchQuestionsAction,
  fetchQuestionAction,
  resetQuestionInitial
} from './reducers/questions';

const routes = {
  *'/'() {
    yield call(fetchQuestionsAction);
  },
  *'/create'() {
    yield call(resetQuestionInitial);
  },
  *'/settings'() {
    yield call(fetchAuthAction, { payload: true });
  },
  *'/:id'({ id }) {
    yield call(fetchQuestionAction, id);
  }
};

export default function* rootSaga() {
  yield [
    router(history, routes),
    authData(),
    modalData(),
    usersWatcher(),
    notificationsData(),
    getQuestionWatcher(),
    getQuestionsSearchWatcher(),
    getAppWatcher()
  ];
}
