import { createAction } from 'store/utils';
import type { IState, TAction } from 'types';

export const updateState = createAction<'redux', {}>(
  'UPDATE_STATE',
  function execute(state: IState, action: TAction<{}>) {
    return {
      ...state,
      ...action.payload,
    };
  }
);
