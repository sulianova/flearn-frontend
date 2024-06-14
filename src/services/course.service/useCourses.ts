import { useEffect, useState } from 'react';

import { useMemoize } from 'hooks';

import type { ICourseData, IFetchCourseProps } from './types/index';
import type CourseService from '.';

export default function useCourses(this: CourseService, fetchProps: IFetchCourseProps) {
  const [memoizedFetchProps] = useMemoize(fetchProps, true);
  const [courses, setCourses] = useState<ICourseData[]>([]);

  useEffect(() => {
    let cancelled = false;

    const s = this.getCourseBS(memoizedFetchProps)
      .subscribe(o => {
        if (!o || o instanceof Error || cancelled) {
          return;
        }
        setCourses(o.courses);
      });

    return () => {
      cancelled = true;
      s?.unsubscribe();
    };
  }, [memoizedFetchProps]);

  return courses;
}