import { useEffect } from 'react';

import { useURLSection } from 'hooks';

import type CourseService from '.';

export default function useSubscribeToLocation(this: CourseService) {
  const section = useURLSection();

  useEffect(() => {
    if (section.name !== 'Course' && section.name !== 'Profile' && section.name !== 'Study') {
      this._currentCourseBS.next(null);
      return;
    }
    let cancelled = false;
    const s = this.getCourseBS({ ids: [section.params.courseId] })
      .subscribe(o => {
        if (!o || o instanceof Error || cancelled) {
          this._currentCourseBS.next(null);
          return;
        }
        const course = o.courses.at(0);
        if (!course) {
          this._currentCourseBS.next(null);
          return;
        }
        this._currentCourseBS.next(course);
      });

    return () => {
      cancelled = true;
      s?.unsubscribe();
    };
  }, [section]);
}
