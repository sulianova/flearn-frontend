import { useEffect, useState } from 'react';

import { useMemoize } from 'hooks';

import type { IFetchHomeworksProps, IHomeworkData } from './types';
import type HomeworkService from '.';

export default function useHomeworks(this: HomeworkService, fetchProps: IFetchHomeworksProps) {
  const [memoizedFetchProps] = useMemoize(fetchProps, true);
  const [homeworks, setHomeworks] = useState<IHomeworkData[]>([]);

  useEffect(() => {
    let cancelled = false;

    const s = this.getHomeworkBS(memoizedFetchProps)
      .subscribe(o => {
        if (!o || o instanceof Error || cancelled) {
          return;
        }
        setHomeworks(o.homeworks.map(a => a.homework));
      });

    return () => {
      cancelled = true;
      s?.unsubscribe();
    };
  }, [memoizedFetchProps]);

  return homeworks;
}
