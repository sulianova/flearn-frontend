import { call, take } from 'redux-saga/effects';

import { createAction } from 'store/utils';
import { login, loginFromStorage, logout } from 'store/actions/sagas';
import { IPayloadWithEffects, IUserState, TAction } from 'types';

export const auth = createAction<'saga'>(
  '***saga*** auth',
  function* execute() {
    while (true) {
      // first try auth from storage
      const loginFromStorageAction: TAction = { type: loginFromStorage.type };
      let userState: IUserState = yield call(loginFromStorage.execute, loginFromStorageAction);

      // if auth from storage failed listen to manual auth action
      if (!userState.user) {
        yield take(login.type);
        const loginAction: TAction<IPayloadWithEffects> = { payload: {}, type: login.type };
        userState = yield call(login.execute, loginAction);
      }

      // if authed, listen to logout action
      if (userState.user) {
        yield take(logout.type);
        const logoutAction: TAction<undefined> = { type: logout.type };
        yield call(logout.execute, logoutAction);
      }
    }
  }
);
