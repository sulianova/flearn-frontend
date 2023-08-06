import { useEffect } from 'react';

import { useMemoize } from 'hooks';
import Store from 'store';

import type { IPayload } from 'types';

export interface IFetchParams<T extends IPayload> {
  actionCreator: any
  payload?: T
}

export function useFetch<T extends IPayload>(params: IFetchParams<T>) {
  const { actionCreator, payload } = params;

  const [newPayload] = useMemoize(payload);

  // refetch data when payload changed
  useEffect(
  () => {
    Store.dispatch(
      actionCreator({
        payload: newPayload,
      })
    );
  },
  [actionCreator, newPayload]);
}
