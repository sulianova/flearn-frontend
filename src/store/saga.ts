import { all, takeEvery } from 'redux-saga/effects';

import * as Actions from './actions/sagas';

export default function* rootSaga() {
  yield all([
    takeEvery(Actions.fetchHomeworks.type, Actions.fetchHomeworks.execute),
  ]);
}
