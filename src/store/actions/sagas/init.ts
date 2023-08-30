import { put } from 'redux-saga/effects';
import { auth } from 'store/actions/sagas';
import { createAction } from 'store/utils';

export const init = createAction<'saga'>(
  '***saga*** init',
  function* execute() {
    // start auth
    yield put(auth({}));
  }
);
