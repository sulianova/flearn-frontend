import { all, takeEvery } from 'redux-saga/effects';

import * as Actions from './actions/sagas';

export default function* rootSaga() {
  yield all([
    takeEvery(Actions.downloadCourse.type, Actions.downloadCourse.execute),
    takeEvery(Actions.fetchCourse.type, Actions.fetchCourse.execute),
    takeEvery(Actions.uploadCourse.type, Actions.uploadCourse.execute),

    takeEvery(Actions.fetchLessons.type, Actions.fetchLessons.execute),

    takeEvery(Actions.downloadLesson.type, Actions.downloadLesson.execute),
    takeEvery(Actions.fetchLesson.type, Actions.fetchLesson.execute),
    takeEvery(Actions.uploadLesson.type, Actions.uploadLesson.execute),
  ]);
}
