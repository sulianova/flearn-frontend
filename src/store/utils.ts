import { updateState } from './actions/redux';

import type {
  IActionCreator,
  IState,
  IHandlers,
  TAction,
  TActionParams,
  TReduxExecuter,
  TSagaExecuter
} from 'types';

export function createAction<T extends 'redux' | 'saga', P = undefined>(
  type: string,
  execute: T extends 'redux' ? TReduxExecuter<P> : TSagaExecuter<P>,
) {
  function action(params: TActionParams<P>): TAction<P>;
  function action(): TAction<undefined>;
  function action(params?: TActionParams<P>): TAction<P> | TAction<undefined> {
    let actionType: string = action.type;

    if (params === undefined) {
      return { type: actionType };
    }

    const { stateName } = params;

    if (stateName !== undefined) {
      actionType = `[${stateName}] ${actionType}`;
    }

    return { type: actionType, ...params };
  }

  action.type = type;
  action.execute = execute;

  return action as IActionCreator<T, P>;
}

export function createReducer(
  stateName: string,
  initialState: IState = {},
  handlers: IHandlers = {}
) {
  handlers[`[${stateName}] ${updateState.type}`] = updateState.execute;

  return function reducer(state = initialState, action: TAction<any>) {
    let newState = state;

    if (handlers.hasOwnProperty(action.type)) {
      newState = handlers[action.type](state, action);
    }

    return newState;
  };
}
