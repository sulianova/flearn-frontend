import { takeEvery, all } from 'redux-saga/effects';

import { fetchCourse } from './actions/sagas';

export function* watchFetchCourse() {
  yield takeEvery('FETCH_COURSE', fetchCourse);
}

export default function* rootSaga() {
  yield all([
    watchFetchCourse(),
  ])
}
