import { router } from 'redux-saga-router';
import { browserHistory as history } from 'react-router';
import { call } from 'redux-saga/effects';

import { authData } from './reducers/auth';
import { modalData } from './reducers/modal';
import { getQuestionWatcher, fetchQuestionsAction, fetchQuestionAction, resetQuestionInitial } from './reducers/questions';

const routes = {
  *'/'() {
    yield call(fetchQuestionsAction);
  },
  *'/create'() {
    yield call(resetQuestionInitial);
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
    getQuestionWatcher()
  ];
}
