import { useEffect, useState } from 'react';

import { useMemoize } from 'hooks';

import type { IFetchLessonsProps, ILessonData } from './types';
import type LessonService from '.';

export default function useLessons(this: LessonService, fetchProps: Partial<IFetchLessonsProps>) {
  const [memoizedFetchProps] = useMemoize(fetchProps, true);
  const [lessons, setLessons] = useState<ILessonData[]>([]);

  useEffect(() => {
    const { courseId } = memoizedFetchProps;
    if (!courseId) {
      return;
    }
  
    let cancelled = false;

    const s = this.getLessonBS({ courseId, ...memoizedFetchProps })
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