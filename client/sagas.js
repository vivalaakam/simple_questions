import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest } from 'redux-saga/effects';

export default function* rootSaga() {
  yield takeLatest(LOCATION_CHANGE, (props) => {
    /* eslint no-console: ["error", { allow: ["log"] }] */
    console.log(props);
  });
}
