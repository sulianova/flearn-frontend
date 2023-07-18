import { IRootState, TAction } from 'types';
import { updateState } from 'store/actions/redux';

export function courseReducer(state: IRootState = {}, action: TAction<any>) {
  switch (action.type) {
    case 'UPDATE_STATE':
      return updateState(state, action);
    default: 
      return state;
  }
}
