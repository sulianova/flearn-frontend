import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { userService } from 'services/user.service';

import classes from './Lesson.module.scss';
import Page, { EPageVariant } from 'ui/Page/Page';
import LessonContent from './LessonContent/LessonContent';
import LessonUppload from './LessonUppload/LessonUppload';
import LessonWorks from './LessonWorks/LessonWorks';
import LessonHeader from './LessonHeader/LessonHeader';

import useCanShowResults from './useCanShowResults';
import useFetchHomework from './useFetchHomework';
import useHomeworkFallback from './useHomeworkFallback';
import useInitHomework from './useInitHomework';
import useLessonFallback from './useLessonFallback';

import { ECommonErrorTypes } from 'types';
import MyWork from './MyWork/MyWork';
import { ILessonData, TLessonState, lessonService } from 'services/lesson.service';

interface IProps {
  section: 'task' | 'results' | 'my-work'
}

export default function Lesson({ section }: IProps) {
  const { courseId, lessonId } = useParams();
  const [scrollToUpload, setScrollToUpload] = useState<boolean>(false);

  const authedUser = userService.useAuthedUser();
  const authedUserId = authedUser?.id;
  const [lessonState, setLessonState] = useState<{ state: TLessonState, lesson: ILessonData | null }>({ state: { type: 'pending' }, lesson: null });

  useInitHomework({ courseId, lessonId, userId: authedUserId, lesson: lessonState.lesson });
  const { homework, homeworkState } = useFetchHomework({ courseId, lessonId, userId: authedUserId });

  const fallback = useLessonFallback({ lessonState, authedUser });
  const homeworkFallback = useHomeworkFallback(homeworkState);
  const { canShowResults, fallBack: resultsFallback } = useCanShowResults({ courseId, lessonId, lesson: lessonState.lesson });
  const [lessonsState, setLessonsState] = useState<{ state: TLessonState, lessons: ILessonData[] }>({ state: { type: 'pending' }, lessons: [] });

  useEffect(() => {
    if (!courseId) {
      return;
    }

    let cancelled = false;
    const s = lessonService
      .getLessonBS({ courseId })
      .subscribe(o => {
        if (!o || cancelled) {
          return;
        }
        if (o instanceof Error) {
          const error = o;
          const errorIsUnknown = !(Object.values(ECommonErrorTypes) as string[]).includes(error.message);
          const errorType = errorIsUnknown ? ECommonErrorTypes.Other : error.message as ECommonErrorTypes;
          setLessonsState({ state: { type: 'error', error, errorType }, lessons: [] });
          return;
        }
        setLessonsState({ state: { type: 'idle' }, lessons: o.lessons });
      });
    return () => {
      cancelled = true;
      s.unsubscribe();
    };
  }, [courseId]);

  useEffect(() => {
    if (!courseId || !lessonId) {
      return;
    }

    let cancelled = false;
    const s = lessonService
      .getLessonBS({ courseId, id: lessonId })
      .subscribe(o => {
        if (!o || cancelled) {
          return;
        }
        if (o instanceof Error) {
          const error = o;
          const errorIsUnknown = !(Object.values(ECommonErrorTypes) as string[]).includes(error.message);
          const errorType = errorIsUnknown ? ECommonErrorTypes.Other : error.message as ECommonErrorTypes;
          setLessonState({ state: { type: 'error', error, errorType }, lesson: null });
          return;
        }
        const lesson = o.lessons[0];
        if (lesson) {
          setLessonState({ state: { type: 'idle' }, lesson });
        }
      });
    return () => {
      cancelled = true;
      s.unsubscribe();
    };
  }, [courseId, lessonId]);

  if (!lessonState.lesson) {
    return fallback;
  }

  if (lessonState.lesson.type === 'Practice' && !homework) {
    return homeworkFallback;
  }

  if (section === 'results' && !canShowResults) {
    return resultsFallback;
  }

  if (section === 'my-work' && !homework) {
    return homeworkFallback;
  }

  return (
    <Page
      variant={EPageVariant.LMS}
      header 
      footer={false}
      style={{ backgroundColor: 'var(--color-background-default)'}}
      scrollToTopDependencie={lessonId}
    >
      <div className={classes.__}>
        <LessonHeader
          lesson={lessonState.lesson}
          section={section}
        />
        {section === 'task' &&
          (<LessonContent
            courseId={courseId!}
            lessonId={lessonId!}
            blocks={lessonState.lesson.content}
            data={lessonState.lesson}
            homework={homework}
            scrollToUpload={() => setScrollToUpload(true)}
            canShowResults={canShowResults}
            user={authedUser}
          />)
        }
        {section === 'task' && homework?.homework?.state === 'DRAFT' &&
          <LessonUppload
            homeworkWPopulate={homework}
            scroll={scrollToUpload}
            onScrollEnd={() => setScrollToUpload(false)}
          />
        }
        {section === 'results' && canShowResults && <LessonWorks/>}
        {section === 'my-work' && <MyWork homework={homework!}/>}
      </div>
    </Page>
  );
}