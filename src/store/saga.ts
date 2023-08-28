import { all, takeEvery } from 'redux-saga/effects';

import { fetchCourse, fetchHomework, fetchLesson, fetchLessons } from './actions/sagas';

export default function* rootSaga() {
  yield all([
    takeEvery(fetchCourse.type, fetchCourse.execute),
    takeEvery(fetchLessons.type, fetchLessons.execute),
    takeEvery(fetchLesson.type, fetchLesson.execute),
    takeEvery(fetchHomework.type, fetchHomework.execute),
  ]);
}
