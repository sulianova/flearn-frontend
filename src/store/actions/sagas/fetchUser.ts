import { createAction } from 'store/utils';
import { dataService } from 'services';
import { put } from 'redux-saga/effects';
import { IPayloadWithEffects, IUserState, TAction } from 'types';
import { updateState } from '../redux';


interface IFetchUserPayload extends IPayloadWithEffects {
  email: string
}

export const fetchUser = createAction<'saga', IFetchUserPayload>(
  '***saga*** fetchUser',
  function* execute(action: TAction<IFetchUserPayload>) {
    try {
      action.payload.effects?.onStart?.();

      const user = yield dataService.user.get(action.payload.email);

      const state: IUserState = {
        user,
      };

      yield put(updateState({ stateName: 'user', payload: state }));

      action.payload.effects?.onSuccess?.();
    } catch(e) {
      action.payload.effects?.onFail?.();

      // tslint:disable-next-line
      console.log(`Failed to fetch user`);
      console.error(e);
    } finally {
      action.payload.effects?.onFinish?.();
    }
  },
);
