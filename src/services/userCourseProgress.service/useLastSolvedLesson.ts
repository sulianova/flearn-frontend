import { useEffect, useState } from 'react';
import { ILessonData } from 'services/lesson.service';
import UserCourseProgressService from '.';

export function useLastSolvedLesson(this: UserCourseProgressService) {
  const [lastSolvedLesson, setLastSolvedLesson] = useState<ILessonData | null>(null);

  useEffect(() => {
    let calcelled = false;
    const s = this
      .getLastSolvedLessonBS()
      .subscribe(o => {
        if (!o || o instanceof Error || calcelled) {
          return;
        }

        setLastSolvedLesson(o);
      });
    return () => {
      calcelled = true;
      s?.unsubscribe();
    };
  }, []);

  return lastSolvedLesson;
}
