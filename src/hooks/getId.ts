import { v4 } from 'uuid';

import { useConst } from 'hooks';

export function useGetId() {
    return useConst(() => {
        const guid = v4();
        return (prefix?: string | number) => !prefix ? guid : `${prefix}-${guid}`;
    });
}
