import { useEffect, useState } from 'react';
import { ILessonData } from 'services/lesson.service';
import UserCourseProgressService from '.';

export default function useFirstNotSolvedLesson(this: UserCourseProgressService) {
  const [firstNotSolvedLesson, setFirstNotSolvedLesson] = useState<ILessonData | null>(null);

  useEffect(() => {
    let calcelled = false;
    const s = this
      .getFirstNotSolvedLessonBS()
      .subscribe(o => {
        if (!o || o instanceof Error || calcelled) {
          return;
        }

        setFirstNotSolvedLesson(o);
      });
    return () => {
      calcelled = true;
      s?.unsubscribe();
    };
  }, []);

  return firstNotSolvedLesson;
}
