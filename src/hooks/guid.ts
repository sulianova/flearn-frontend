import { useCallback, useState } from 'react';
import { v4 } from 'uuid';

const getId = () => `guid-${v4()}`;

export function useGuid() {
    const [guid, setGuid] = useState<string>(getId);
    const updateGuid = useCallback(() => setGuid(getId()), []);
    return [guid, updateGuid] as const;
}
