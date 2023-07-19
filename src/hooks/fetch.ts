import { useEffect } from 'react';

import Store from 'store';
import { useMemoize } from './memoize';

import type { IPayload } from 'types';

export interface IFetchParams<T extends IPayload> {
  actionCreator: any
  payload?: T
}

export function useFetch<T extends IPayload>(params: IFetchParams<T>) {
  const { actionCreator, payload } = params;

  const [newPayload] = useMemoize(payload);

  // refetch data when payload changed
  useEffect(() => {
    Store.dispatch(
      actionCreator({
        payload: newPayload,
      })
    );
  }, [actionCreator, newPayload]);
}
