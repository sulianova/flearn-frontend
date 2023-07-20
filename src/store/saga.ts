import { all, takeEvery } from 'redux-saga/effects';

import { fetchCourse } from './actions/sagas';

export default function* rootSaga() {
  yield all([
    takeEvery(fetchCourse.type, fetchCourse.execute),
  ]);
}
