import { createAction } from 'store/utils';
import { authService, dataService } from 'services';
import { put, select } from 'redux-saga/effects';
import { IPayloadWithEffects, IRootState, IUserState, TAction } from 'types';
import { updateState } from '../../redux';

const userSelector = (state: IRootState) => state.user;

export const login = createAction<'saga', IPayloadWithEffects>(
  '***saga*** login',
  function* execute(action: TAction<IPayloadWithEffects>) {
    try {
      action.payload.effects?.onStart?.();

      const userState: IUserState = yield select(userSelector);
      let user = userState.user;
      if (!user) {
        yield authService.authenticate();
        if (!authService.isAuthenticated) {
          throw new Error('failed to authenticate');
        }

        const { email, displayName, photoURL } = authService.user!;
        if (!email) {
          throw new Error(`faild to authenticate: email: ${email}`);
        }
        user = yield dataService.user.getOrCreate(email, { email, displayName, photoURL });
      }

      const state: IUserState = {
        user,
      };

      yield put(updateState({ stateName: 'user', payload: state }));

      action.payload.effects?.onSuccess?.();

      return state;
    } catch(e) {
      action.payload.effects?.onFail?.();

      // tslint:disable-next-line
      console.log(`Faild to authenticate`);
      console.error(e);

      const state: IUserState = {
      };
      return state;
    } finally {
      action.payload.effects?.onFinish?.();
    }
  },
);
