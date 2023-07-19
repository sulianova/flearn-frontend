import { useRef } from 'react';
import { IPayload } from 'types';

import { isSamePayload } from 'utils';

export function useMemoize<T extends IPayload>(payload: T, useInitialPayload = false) {
    const ref = useRef(useInitialPayload ? payload : undefined);

    let payloadChanged = false;
    if (!isSamePayload(payload, ref.current)) {
        ref.current = payload;
        payloadChanged = true;
    }

    return [ref.current as T, payloadChanged] as const;
}
