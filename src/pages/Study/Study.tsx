import { useEffect, useState } from 'react';
import { useParams } from 'react-router';


import { ILessonData, TLessonState, lessonService } from 'services/lesson.service';
import { authService, dataService } from 'services';
import { homeworkService } from 'services/homework.service';
import { userService } from 'services/user.service';
import { emailService } from 'services/email.service';
import { courseService } from 'services/course.service';

import Fallback from 'ui/Fallback';
import Page, { EPageVariant } from 'ui/Page/Page';

import { ECommonErrorTypes } from 'types';

import classes from './Study.module.scss';
import LessonContent from './LessonContent/LessonContent';
import LessonUppload from './LessonUppload/LessonUppload';
// import LessonWorks from './LessonWorks/LessonWorks';
import LessonHeader from './LessonHeader/LessonHeader';
import useLessonFallback from './useLessonFallback';
import { userAccessService } from 'services/userAccess.service';

interface IProps {
  section: 'task' | 'results'
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
        await userAccessService.add(courseId, user.email, 'FREE');
        const course = (await courseService._fetch({ ids: [courseId] })).at(0)!;
        await emailService.sendEmail({
          type: emailService.EEmail.WelcomeToCourse,
          to: { email: user.email },
          course,
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

  const authedUser = userService.useAuthedUser();
  const authedUserId = authedUser?.id;
  const homework = homeworkService.useHomeworks({ filter: { courseId: courseId!, lessonId: lessonId, userId: authedUserId }}).at(0);
  const [lessonState, setLessonState] = useState<{ state: TLessonState, lesson: ILessonData | null }>({ state: { type: 'pending' }, lesson: null });

  const fallback = useLessonFallback({ lessonState, authedUser });
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

  return (
    <Page
      variant={EPageVariant.LMS}
      header 
      footer={false}
      backgroundColor='var(--color-background-default)'
      scrollToTopDependencie={lessonId}
    >
      <div className={classes.__}>
        {lessonState.lesson.type === 'Practice' && (
          <LessonHeader
            section={section}
          />
        )}
        {section === 'task' &&
          (<LessonContent
            courseId={courseId!}
            lessonId={lessonId!}
            lesson={lessonState.lesson}
            user={authedUser}
          />)
        }
        {section === 'results' &&
          <LessonUppload
            homework={homework}
            user={authedUser}
          />
        }
        {/* {section === 'results' && canShowResults && <LessonWorks/>} */}
      </div>
    </Page>
  );
}
