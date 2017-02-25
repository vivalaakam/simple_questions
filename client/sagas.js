import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest } from 'redux-saga/effects';
import { authData } from './reducers/auth';
import { modalData } from './reducers/modal';

export default function* rootSaga() {
  yield takeLatest(LOCATION_CHANGE, (props) => {
    /* eslint no-console: ["error", { allow: ["log"] }] */
    console.log(props);
  });

  yield [
    authData(),
    modalData()
  ];
}
