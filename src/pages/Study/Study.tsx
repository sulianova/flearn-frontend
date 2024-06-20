import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { userService } from 'services/user.service';

import classes from './Study.module.scss';
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
import { ILessonData, TLessonState, lessonService } from 'services/lesson.service';
import { authService, dataService } from 'services';
import Fallback from 'ui/Fallback';
import { emailService } from 'services/email.service';
import { courseService } from 'services/course.service';

interface IProps {
  section: 'task' | 'results' | 'my-work'
}

export default function LessonContainer(props: IProps) {
  const { courseId, lessonId } = useParams();
  const [grandAccessFinished, setGrandAccessFinished] = useState(false);

  useEffect(() => {
    const user = authService.user;
    if (!user || !courseId || !lessonId) {
      return;
    }

    (async () => {
      const hasAccess = await dataService.access.get(courseId, user.email).catch(() => null).then(Boolean);
      if (!hasAccess) {
        await dataService.access.add(courseId, user.email, 'FREE');
        const course = (await courseService._fetch({ ids: [courseId] })).at(0)!;
        const firstLesson = (await lessonService.fetch({ courseId: courseId, topicOrder: 1, orderInTopic: 1 })).at(0);
        await emailService.sendEmail({
          type: emailService.EEmail.WelcomeToCourse,
          to: { email: user.email },
          course,
          firstLesson,
        });
      }

      setGrandAccessFinished(true);
    })();
  }, [courseId, lessonId]);

  if (!grandAccessFinished) {
    return <Fallback.Pending text='Loading lesson'/>;
  }

  return <Lesson {...props}/>
}

function Lesson({ section }: IProps) {
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

  return (
    <Page
      variant={EPageVariant.LMS}
      header 
      footer={false}
      style={{ backgroundColor: 'var(--color-background-default)'}}
      scrollToTopDependencie={lessonId}
    >
      <div className={classes.__}>
        {/* <LessonHeader
          lesson={lessonState.lesson}
          section={section}
        /> */}
        {section === 'task' &&
          (<LessonContent
            courseId={courseId!}
            lessonId={lessonId!}
            lesson={lessonState.lesson}
            user={authedUser}
            homework={homework}
            scrollToUpload={() => setScrollToUpload(true)}
            canShowResults={canShowResults}
          />)
        }
        {section === 'task' && homework?.homework?.state === 'DRAFT' &&
          <LessonUppload
            homeworkWPopulate={homework}
          />
        }
        {section === 'results' && canShowResults && <LessonWorks/>}
      </div>
    </Page>
  );
}