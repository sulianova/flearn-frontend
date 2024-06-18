import { useEffect, useState } from 'react';

import { useMemoize } from 'hooks';

import type { IFetchLessonsProps, ILessonData } from './types';
import type LessonService from '.';

export default function useLessons(this: LessonService, fetchProps: IFetchLessonsProps) {
  const [memoizedFetchProps] = useMemoize(fetchProps, true);
  const [lessons, setLessons] = useState<ILessonData[]>([]);

  useEffect(() => {
    let cancelled = false;

    const s = this.getLessonBS(memoizedFetchProps)
      .subscribe(o => {
        if (!o || o instanceof Error || cancelled) {
          return;
        }
        setLessons(o.lessons);
      });

    return () => {
      cancelled = true;
      s?.unsubscribe();
    };
  }, [memoizedFetchProps]);

  return lessons;
}