import { useCallback, useState } from 'react';
import { v4 } from 'uuid';

export function useGuid() {
    const [guid, setGuid] = useState<string>(v4);
    const updateGuid = useCallback(() => setGuid(v4()), []);
    return [guid, updateGuid] as const;
}
