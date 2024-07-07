import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { type ICourseData, courseService } from 'services/course.service';
import { IUserData } from 'services/user.service';
import { type ILessonData, lessonService } from 'services/lesson.service';
import { userCourseProgressService } from 'services/userCourseProgress.service';
import { URLSections } from 'router';

import BuyPopup from 'components/BuyPopup/BuyPopup';
import Article from 'ui/Article/Article';

import TheoryFooter from '../TheoryFooter/TheoryFooter';
import LessonQuestion from '../LessonQuestion/LessonQuestion';
import classes from './LessonContent.module.scss';
import { emailService } from 'services/email.service';

export default LessonContent;

interface IProps {
  courseId: string
  lessonId: string
  lesson: ILessonData
  user: IUserData | null
}

function LessonContent(props: IProps) {
  const { courseId, user, lesson } = props;
  const navigate = useNavigate();
  const [nextLesson, setNextLesson] = useState<ILessonData | null | undefined>(undefined);
  const [course, setCourse] = useState<ICourseData | undefined>(undefined);
  const [buyPopupIsOpened, setBuyPopupIsOpened] = useState(false);

  useEffect(() => {
    lessonService
      .fetchNextLesson(lesson)
      .then(l => setNextLesson(l));
  }, [lesson]);

  useEffect(() => {
    if (!courseId) {
      return;
    }
  
    let cancelled = false;
    const s = courseService
      .getCourseBS({ ids: [courseId] })
      .subscribe(action => {
        if (!action || (action instanceof Error) || cancelled || !action.courses.at(0)) {
          return;
        }

        setCourse(action.courses.at(0));
      });
    return () => {
      s.unsubscribe();
      cancelled = true;
    };
  }, [courseId]);

  return (
    <>
      {buyPopupIsOpened && course && user && <BuyPopup user={user} course={course} close={() => setBuyPopupIsOpened(false)}/>}
      <div className={classes._}>
        <h1 className={classes.title}>{lesson.title}</h1>
        <Article blocks={lesson.content}/>
        <LessonQuestion/>
        <TheoryFooter
          onNext={async () => {
            if (!user || nextLesson === undefined) {
              return;
            }
            if (course && lesson.topicOrder === 1 && lesson.orderInTopic === 1 && lesson.isFree) {
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
              .markLessonAsRead(courseId, user.email, lesson.id)
              .then(() => {
                if (nextLesson === null) {
                  //course has ended
                  navigate(URLSections.Profile.to({ courseId }));
                } else if (!nextLesson!.isFree) {
                  // next lesson is not free
                  // TODO show pay screen
                  setBuyPopupIsOpened(true);
                } else {
                  navigate(URLSections.Study.to({ courseId, lessonId: nextLesson!.id }));
                }
              });
          }}
        />
      </div>
    </>
  );
}
