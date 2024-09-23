import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { lessonService } from 'services/lesson.service';
import { authService, dataService } from 'services';
import { homeworkService } from 'services/homework.service';
import { userService } from 'services/user.service';
import { emailService } from 'services/email.service';
import { courseService } from 'services/course.service';
import { userAccessService } from 'services/userAccess.service';
import { userCourseProgressService } from 'services/userCourseProgress.service';

import Fallback from 'ui/Fallback';
import Page, { EPageVariant } from 'ui/Page/Page';

import classes from './Study.module.scss';
import LessonContent from './LessonContent/LessonContent';
import LessonUppload from './LessonUppload/LessonUppload';
import LessonHeader from './LessonHeader/LessonHeader';

interface IProps {
  section: 'task' | 'results'
}

export default function LessonContainer(props: IProps) {
  const { courseId, lessonId } = useParams();
  const [initFinished, setInitFinished] = useState(false);

  useEffect(() => {
    const user = authService.user;
    if (!user || !courseId || !lessonId) {
      setInitFinished(true);
      return;
    }

    (async () => {
      const progress = await dataService.userCourseProgress.get(courseId, user.email);
      const isNewUser = Object.keys(progress).length === 0;
      if (!progress[lessonId]) {
        // on the background
        userCourseProgressService.saveLessonProgress({ courseId, lessonId, userEmail: user.email, unlockedBlocks: 0 })
      }

      if (isNewUser) {
        const course = (await courseService._fetch({ ids: [courseId] })).at(0)!;
        await emailService.sendEmail({
          type: emailService.EEmail.WelcomeToCourse,
          to: { email: user.email },
          course,
        });
      }

      setInitFinished(true);
    })();
  }, [courseId, lessonId]);

  if (!initFinished) {
    return (
      <Fallback.Pending
        text='Loading lesson'
        variant={EPageVariant.LMS}
      />
    );
  }

  return <Lesson {...props}/>
}

function Lesson({ section }: IProps) {
  const { courseId, lessonId } = useParams();

  const authedUser = userService.useAuthedUser();
  const authedUserId = authedUser?.id;
  const homework = homeworkService.useHomeworks({ filter: { courseId: courseId!, lessonId: lessonId, userId: authedUserId }}).at(0);
  const currentCourse = courseService.useCurrentCourse();
  const currentLesson = lessonService.useCurrentLesson();
  const currentCourseAccess = userAccessService.useAccess();
  const progress = userCourseProgressService.useCurrentCourseProgress() ?? {};

  if (!currentCourse || !currentLesson || !currentCourseAccess) {
    return (
      <Fallback.Pending
        text='Loading lesson'
        variant={EPageVariant.LMS}
      />
    );
  }

  if (!currentLesson.isFree && currentCourseAccess === 'FREE' && authedUser?.role !== 'support') {
    return (
      <Fallback.Info
        variant={EPageVariant.LMS}
      >
        Это платный урок. Купите курс, чтобы получить доступ.
      </Fallback.Info>
    );
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
            key={`${courseId}-${lessonId}-${authedUser?.email}`}
            course={currentCourse}
            courseAccess={currentCourseAccess}
            lesson={currentLesson}
            user={authedUser}
            progress={progress}
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
