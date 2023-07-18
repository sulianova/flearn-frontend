export type TActionParams<P> = P extends undefined ? P : { payload: P };

export type TAction<P = undefined> = TActionParams<P> & { type: string };
