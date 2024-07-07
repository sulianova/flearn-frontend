import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { type ICourseData } from 'services/course.service';
import { type TAccess } from 'services/data.service/Access';
import { type IUserData } from 'services/user.service';
import { type ILessonData, lessonService } from 'services/lesson.service';
import { userCourseProgressService } from 'services/userCourseProgress.service';
import { emailService } from 'services/email.service';
import { URLSections } from 'router';

import BuyPopup from 'components/BuyPopup/BuyPopup';
import Article from 'ui/Article/Article';

import TheoryFooter from '../TheoryFooter/TheoryFooter';
import LessonQuestion from '../LessonQuestion/LessonQuestion';
import classes from './LessonContent.module.scss';

interface IProps {
  course: ICourseData
  lesson: ILessonData
  user: IUserData
  courseAccess: TAccess
}

export default function LessonContent(props: IProps) {
  const { course, lesson, user, courseAccess } = props;

  const navigate = useNavigate();
  const nextLesson = lessonService.useNextLesson();

  const [buyPopupIsOpened, setBuyPopupIsOpened] = useState(false);

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
        <Article blocks={lesson.content}/>
        <LessonQuestion/>
        <TheoryFooter
          onNext={async () => {
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
                } else if (!nextLesson.isFree && courseAccess === 'FREE') {
                  setBuyPopupIsOpened(true);
                } else {
                  navigate(URLSections.Study.to({ courseId: course.id, lessonId: nextLesson.id }));
                }
              });
          }}
        />
      </div>
    </>
  );
}
