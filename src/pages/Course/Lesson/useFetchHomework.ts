import { useEffect, useState } from 'react';
import type { Subscription } from 'rxjs';

import { homeworkService } from 'services';
import type { IHomeworkDataWPopulate, THomeworkStateState } from 'types';

interface IProps {
  courseId?: string
  lessonId?: string
  userId?: string
}

export default function useFetchHomework(props: Readonly<IProps>) {
  const { courseId, lessonId, userId } = props;

  const [homework, setHomework] = useState<IHomeworkDataWPopulate | undefined>(undefined);
  const [homeworkState, setHomeworkState] = useState<THomeworkStateState>({ type: 'idle' });

  useEffect(() => {
    if (!courseId || !lessonId || !userId) {
      return;
    }

    setHomeworkState({ type: 'pending' });
    let subscription: Subscription;
    homeworkService.getHomeworkBS({
      filter: { courseId, lessonId, userId },
      populate: { user: true },
    }).then(bs => {
      subscription = bs.subscribe(e => {
        if (e && !(e instanceof Error)) {
          setHomework(e.homeworks[0]);
          setHomeworkState({ type: 'idle' });
        }

        if (e instanceof Error) {
          const errorType = homeworkService.errorToType(e);
          setHomeworkState({ type: 'error', error: e, errorType });
        }
      });
    });

    return () => subscription?.unsubscribe();
  }, [courseId, lessonId, userId]);

  return { homework, homeworkState };
}
