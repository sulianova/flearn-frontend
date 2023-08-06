import { all, takeEvery } from 'redux-saga/effects';

import * as Actions from './actions/sagas';

export default function* rootSaga() {
  yield all([
    takeEvery(Actions.fetchCourse.type, Actions.fetchCourse.execute),
    takeEvery(Actions.saveCourse.type, Actions.saveCourse.execute),
    takeEvery(Actions.fetchLessons.type, Actions.fetchLessons.execute),
  ]);
}
