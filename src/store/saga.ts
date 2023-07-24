import { all, takeEvery } from 'redux-saga/effects';

import { fetchCourse, fetchLessons } from './actions/sagas';

export default function* rootSaga() {
  yield all([
    takeEvery(fetchCourse.type, fetchCourse.execute),
    takeEvery(fetchLessons.type, fetchLessons.execute),
  ]);
}
