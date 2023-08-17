import { createAction } from 'store/utils';
import { authService, dataService } from 'services';
import { put } from 'redux-saga/effects';
import { IPayloadWithEffects, IUserState, TAction } from 'types';
import { updateState } from '../../redux';

export const login = createAction<'saga', IPayloadWithEffects>(
  '***saga*** login',
  function* execute(action: TAction<IPayloadWithEffects>) {
    try {
      action.payload.effects?.onStart?.();

      yield authService.authenticate();

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

      action.payload.effects?.onSuccess?.();

      return state;
    } catch(e) {
      action.payload.effects?.onFail?.();

      // tslint:disable-next-line
      console.log(`Failed to authenticate`);
      console.error(e);

      const state: IUserState = {
        user: undefined,
      };
      return state;
    } finally {
      action.payload.effects?.onFinish?.();
    }
  },
);
