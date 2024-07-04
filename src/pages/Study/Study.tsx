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
  const currentLesson = lessonService.useCurrentLesson();

  if (!currentLesson) {
    return <Fallback.Pending text='Loading lesson'/>;
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
        {currentLesson.type === 'Practice' && (
          <LessonHeader
            section={section}
          />
        )}
        {section === 'task' &&
          (<LessonContent
            courseId={courseId!}
            lessonId={lessonId!}
            lesson={currentLesson}
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
