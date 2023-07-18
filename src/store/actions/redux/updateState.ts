import { IRootState, TAction } from 'types';

export function updateState(state: IRootState, action: TAction<{}>) {
  return {
    ...state,
    ...action.payload,
  };
}
