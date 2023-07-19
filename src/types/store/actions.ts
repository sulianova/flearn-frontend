import { IState, TStateName } from 'types';

interface IActionParams {
  stateName?: TStateName
}

export type TActionParams<P> = P extends undefined ? IActionParams : IActionParams & { payload: P };

export type TAction<P = undefined> = TActionParams<P> & { type: string };

export type IActionCreator<T extends 'redux' | 'saga', P = any> =
  {
    type: string
    execute: T extends 'redux' ? TReduxExecuter<P> : TSagaExecuter<P>
    (params: TActionParams<P>): TAction<P>
  };

export type TReduxExecuter<P> = (state: IState, action: TAction<P>) => IState;
export type TSagaExecuter<P> = (action: TAction<P>) => Generator<any, any, any>;

// action handlers
export interface IHandlers {
  [key: string]: TReduxExecuter<any>
}
