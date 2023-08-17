import { createAction } from 'store/utils';
import { authService, dataService } from 'services';
import { put } from 'redux-saga/effects';
import { IUserState } from 'types';
import { updateState } from '../../redux';

export const loginFromStorage = createAction<'saga'>(
  '***saga*** login from storage',
  function* execute() {
    try {
      yield authService.authUsingPersistance();
      if (!authService.isAuthenticated) {
        throw new Error('failed to authenticate');
      }

      const { email, displayName, photoURL } = authService.user!;
      if (!email) {
        throw new Error(`Cannot authenticate with email: ${email}`);
      }

      const user = yield dataService.user.getOrCreate(email, { email, displayName, photoURL });
      const state: IUserState = {
        user,
      };

      yield put(updateState({ stateName: 'user', payload: state }));

      return state;
    } catch(e) {

      // tslint:disable-next-line
      console.log(`Failed to authenticate`);
      console.error(e);

      const state: IUserState = {
        user: undefined,
      };
      yield put(updateState({ stateName: 'user', payload: state }));
      return state;
    }
  },
);
