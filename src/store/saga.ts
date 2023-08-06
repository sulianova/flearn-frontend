import { all, takeEvery } from 'redux-saga/effects';

import * as Actions from './actions/sagas';

export default function* rootSaga() {
  yield all([
    takeEvery(Actions.downloadCourse.type, Actions.downloadCourse.execute),
    takeEvery(Actions.fetchCourse.type, Actions.fetchCourse.execute),
    takeEvery(Actions.uploadCourse.type, Actions.uploadCourse.execute),
    takeEvery(Actions.fetchLessons.type, Actions.fetchLessons.execute),
  ]);
}
