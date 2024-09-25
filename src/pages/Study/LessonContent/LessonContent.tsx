import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { type ICourseData } from 'services/course.service';
import { userService, type IUserData } from 'services/user.service';
import { type ILessonData, lessonService } from 'services/lesson.service';
import { type TUserCourseProgress, userCourseProgressService } from 'services/userCourseProgress.service';
import { emailService } from 'services/email.service';
import { type TAccess } from 'services/userAccess.service';
import { surveyAnswersService } from 'services/surveyAnswers.service';
import { URLSections } from 'router';

import BuyPopup from 'components/BuyPopup/BuyPopup';
import SignupGooglePopup from 'components/SignupGooglePopup/SignupGooglePopup';
import Article from 'ui/Article/Article';

import TheoryFooter from '../TheoryFooter/TheoryFooter';
import LessonSurvey from '../LessonSurvey/LessonSurvey';
import classes from './LessonContent.module.scss';
import { authService } from 'services';
import { discountService } from 'services/discount.service';
import { MIN_PER_DAY } from 'utils';

interface IProps {
  course: ICourseData
  lesson: ILessonData
  user: IUserData | null
  courseAccess: TAccess
  progress: TUserCourseProgress
}

export default function LessonContent(props: IProps) {
  const { course, lesson, user, courseAccess, progress } = props;

  const [signupGooglePopupIsOpened, setSignupGooglePopupIsOpened] = useState(false);

  const navigate = useNavigate();
  const nextLesson = lessonService.useNextLesson();
  const lessonSurveyAnswers = surveyAnswersService.useCurrentLessonSurveyAnswers();

  const [buyPopupIsOpened, setBuyPopupIsOpened] = useState(false);
  const handlers = useMemo(() => ({
    'open-buy-source-popup': () => setBuyPopupIsOpened(true),
  }), []);

  const courseId = course.id;
  const lessonId = lesson.id;
  const userEmail = user?.email;
  const onUnlockBlock = useCallback((unlockedBlocks: number) => {
    if (userEmail) {
      userCourseProgressService.saveLessonProgress({ courseId, lessonId, userEmail, unlockedBlocks })
        .catch(_err => { /* do nothing */});
    }
  }, [courseId, lessonId, userEmail]);

  const initiallyUlockedBlocks = useMemo(() => {
    const lessonProgress = progress[lessonId];
    if (!lessonProgress) {
      return 0;
    }
    if (lessonProgress.solved) {
      return Infinity;
    }
    return lessonProgress.solvedQuizesAmount ?? 0;
  }, [courseId, lessonId, userEmail]);

  const [allQuizesSubmited, setAllQuizesSubmited] = useState(() => initiallyUlockedBlocks >= lesson.content.filter(b => b.type === 'quiz' || b.type === 'chat').length);
  useEffect(() => {
    setAllQuizesSubmited(initiallyUlockedBlocks >= lesson.content.filter(b => b.type === 'quiz' || b.type === 'chat').length);
  }, [initiallyUlockedBlocks, lesson.content]);

  return (
    <>
      {buyPopupIsOpened && user && (
        <BuyPopup
          user={user}
          close={() => setBuyPopupIsOpened(false)}
        />
      )}
      {signupGooglePopupIsOpened && (
        <SignupGooglePopup
          text={'Начать учиться на курсе с бесплатным аккаунтом Flearn'}
          close={() => setSignupGooglePopupIsOpened(false)}
          onSuccess={() => {
            const authedUser = authService.user;
            if (!authedUser) {
              return;
            }

            userCourseProgressService
              .markLessonAsRead(course.id, authedUser.email, lesson.id)
              .then(() => {
                if (nextLesson === null) {
                  navigate(URLSections.Course.to({ courseId: course.id }));
                } else if (!nextLesson.isFree && courseAccess === 'FREE') {
                  setBuyPopupIsOpened(true);
                } else {
                  navigate(URLSections.Study.to({ courseId: course.id, lessonId: nextLesson.id }));
                }
              });
          }}
        />
      )}
      <div className={classes._}>
        <h1 className={classes.title}>{lesson.title}</h1>
        <Article
          key={lessonId}
          blocks={lesson.content}
          handlers={handlers}
          initiallyUlockedBlocks={initiallyUlockedBlocks}
          onUnlockBlock={onUnlockBlock}
          onAllBlocksUnlocked={() => setAllQuizesSubmited(true)}
        />
        {allQuizesSubmited && user && (
          <LessonSurvey
            lesson={lesson}
            user={user}
            answers={lessonSurveyAnswers}
          />
        )}
        <TheoryFooter
          onNext={
            (lesson.survey && !lessonSurveyAnswers && user) || !allQuizesSubmited ? undefined
            : async () => {
              discountService.tryToAddToAuthedUser({
                type: 'personal',
                product: 'subscription',
                startDate: new Date(),
                minutes: MIN_PER_DAY * 2,
                discountPRC: 50,
              }, 50);
              if (lesson.topicOrder === 1 && lesson.orderInTopic === 1 && lesson.isFree && user) {
                const isLessonSolved = await userCourseProgressService
                  .isLessonSolved(course.id, user.email, lesson.id)
                  .catch(_err => true);
                if (!isLessonSolved) {
                  emailService.sendEmail({
                    type: emailService.EEmail.DiscontSolveFreeLessonsInWeek,
                    to: user,
                    course,
                  });
                }
              }

              if (user) {
                userCourseProgressService
                  .markLessonAsRead(course.id, user.email, lesson.id)
                  .then(() => {
                    if (nextLesson === null) {
                      navigate(URLSections.Course.to({ courseId: course.id }));
                    } else if (!nextLesson.isFree && courseAccess === 'FREE' && user.role === 'user') {
                      setBuyPopupIsOpened(true);
                    } else {
                      navigate(URLSections.Study.to({ courseId: course.id, lessonId: nextLesson.id }));
                    }
                  });
              } else {
                setSignupGooglePopupIsOpened(true);
              }
            }
          }
        />
      </div>
    </>
  );
}
