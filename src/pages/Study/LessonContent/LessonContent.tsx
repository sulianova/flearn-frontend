import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { type ICourseData } from 'services/course.service';
import { type IUserData } from 'services/user.service';
import { type ILessonData, lessonService } from 'services/lesson.service';
import { type TUserCourseProgress, userCourseProgressService } from 'services/userCourseProgress.service';
import { emailService } from 'services/email.service';
import { type TAccess } from 'services/userAccess.service';
import { surveyAnswersService } from 'services/surveyAnswers.service';
import { URLSections } from 'router';

import BuyPopup from 'components/BuyPopup/BuyPopup';
import Article from 'ui/Article/Article';

import TheoryFooter from '../TheoryFooter/TheoryFooter';
import LessonSurvey from '../LessonSurvey/LessonSurvey';
import classes from './LessonContent.module.scss';

interface IProps {
  course: ICourseData
  lesson: ILessonData
  user: IUserData
  courseAccess: TAccess
  progress: TUserCourseProgress
}

export default function LessonContent(props: IProps) {
  const { course, lesson, user, courseAccess, progress } = props;

  const navigate = useNavigate();
  const nextLesson = lessonService.useNextLesson();
  const lessonSurveyAnswers = surveyAnswersService.useCurrentLessonSurveyAnswers();

  const [buyPopupIsOpened, setBuyPopupIsOpened] = useState(false);
  const handlers = useMemo(() => ({
    'open-buy-source-popup': () => setBuyPopupIsOpened(true),
  }), []);

  const courseId = course.id;
  const lessonId = lesson.id;
  const userEmail = user.email;
  const quizeSubmit = useCallback((quizIndex: number) => {
    userCourseProgressService.saveLessonQuizeProgress({ courseId, lessonId, userEmail, quizIndex })
      .catch(_err => { /* do nothing */});
  }, [courseId, lessonId, userEmail]);

  const initialSolvedQuizes = useMemo(() => {
    const lessonProgress = progress[lessonId];
    if (!lessonProgress) {
      return 0;
    }
    if (lessonProgress.solved) {
      return Infinity;
    }
    return lessonProgress.solvedQuizesAmount ?? 0;
  }, [courseId, lessonId, userEmail]);

  const [allQuizesSubmited, setAllQuizesSubmited] = useState(() => lesson.content.filter(b => b.type === 'quiz').length === 0);
  useEffect(() => {
    setAllQuizesSubmited(initialSolvedQuizes >= lesson.content.filter(b => b.type === 'quiz').length);
  }, [initialSolvedQuizes, lessonId, userEmail]);

  return (
    <>
      {buyPopupIsOpened && (
        <BuyPopup
          user={user}
          course={course}
          close={() => setBuyPopupIsOpened(false)}
        />
      )}
      <div className={classes._}>
        <h1 className={classes.title}>{lesson.title}</h1>
        <Article
          blocks={lesson.content}
          handlers={handlers}
          initialSolvedQuizes={initialSolvedQuizes}
          onQuizeSubmit={quizeSubmit}
          onLastQuizSubmit={() => setAllQuizesSubmited(true)}
        />
        {allQuizesSubmited && (
          <LessonSurvey
            lesson={lesson}
            user={user}
            answers={lessonSurveyAnswers}
          />
        )}
        <TheoryFooter
          onNext={
            (lesson.survey && !lessonSurveyAnswers) || !allQuizesSubmited ? undefined
            : async () => {
              if (lesson.topicOrder === 1 && lesson.orderInTopic === 1 && lesson.isFree) {
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

              userCourseProgressService
                .markLessonAsRead(course.id, user.email, lesson.id)
                .then(() => {
                  if (nextLesson === null) {
                    navigate(URLSections.Profile.to({ courseId: course.id }));
                  } else if (!nextLesson.isFree && courseAccess === 'FREE' && user.role === 'user') {
                    setBuyPopupIsOpened(true);
                  } else {
                    navigate(URLSections.Study.to({ courseId: course.id, lessonId: nextLesson.id }));
                  }
                });
            }
          }
        />
      </div>
    </>
  );
}
