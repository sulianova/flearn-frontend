import { call, take } from 'redux-saga/effects';

import { createAction } from 'store/utils';
import { login, logout } from 'store/actions/sagas';
import { IPayloadWithEffects, IUserState, TAction } from 'types';

export const auth = createAction<'saga'>(
  '***saga*** auth',
  function* execute() {
    while (true) {
      yield take(login.type);
      const loginAction: TAction<IPayloadWithEffects> = { payload: {}, type: login.type };
      const userState: IUserState = yield call(login.execute, loginAction);
      if (userState.user) {
        yield take(logout.type);
        const logoutAction: TAction<undefined> = { type: logout.type };
        const userState: IUserState = yield call(logout.execute, logoutAction);
      }
    }
  }
);
