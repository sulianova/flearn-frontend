import { useState } from 'react';

import { URLSections } from 'router';

import { type IUserData, userService } from 'services/user.service';
import { type ILessonData, lessonService } from 'services/lesson.service';
import { type ICourseData, courseService } from 'services/course.service';
import { type TAccess, userAccessService } from 'services/userAccess.service';

import Header from './Header/Header';
import Description from './Description/Description';
import CoursePage from './CoursePage/CoursePage';
import SocialValidation from './SocialValidation/SocialValidation';
import Catalogue from './Catalogue/Catalogue';
import BuyPopup from 'components/BuyPopup/BuyPopup';
import LessonsPopup from 'components/LessonsPopup/LessonsPopup';
import Page, { EPageVariant } from 'ui/Page/Page';
import Fallback from 'ui/Fallback';

import classes from './Profile.module.scss';

export default function ProfileContainer() {
  const authedUser = userService.useAuthedUser();
  const currentCourse = courseService.useCurrentCourse();
  const courseLessons = lessonService.useCourseLessons();
  const currentCourseAccess = userAccessService.useCurrentCourseAccess();

  if (!authedUser || !currentCourse || !courseLessons || !currentCourseAccess) {
    return (
      <Fallback.Pending
        text='Loading profile'
        variant={EPageVariant.LMS}
      />
    );
  }

  return (
    <Profile
      authedUser={authedUser}
      currentCourse={currentCourse}
      courseLessons={courseLessons}
      currentCourseAccess={currentCourseAccess}
    />
  );
}

interface IProps {
  authedUser: IUserData
  currentCourse: ICourseData
  courseLessons: Array<ILessonData & { solved: boolean, canBeAccessed: boolean }>
  currentCourseAccess: TAccess
}

function Profile(props: IProps) {
  const { authedUser, currentCourse, courseLessons, currentCourseAccess } = props;

  const [openedTopic, setOpenedTopic] = useState<string | null>(null);
  const [buyCoursePopupIsOpened, setBuyCoursePopupIsOpened] = useState(false);

  const {
    description,
    feedbacks
  } = currentCourse.content;

  const firstLesson = lessonService.useLessons({ courseId: 'how-to-draw', topicOrder: 1, orderInTopic: 1 }).at(0);
  const linkToFreeCourse = firstLesson
    ? URLSections.Study.to({ courseId: 'how-to-draw', lessonId: firstLesson.id })
    : URLSections.Profile.to({ courseId: 'how-to-draw' });
  const [popupVisible, setPopupVisible] = useState(false);
  const onNotAuthedClick = () => setPopupVisible(true);

  const blocks: JSX.Element[] = [
    // <CoursePage authedUser={authedUser} currentCourse={currentCourse} courseLessons={courseLessons} currentCourseAccess={currentCourseAccess}/>,
    // description && <Description type={currentCourse.type} description={description}/>,
    // feedbacks && feedbacks.length && <SocialValidation feedbacks={feedbacks}/>,
    <Catalogue linkToFreeCourse={linkToFreeCourse} onNotAuthedClick={onNotAuthedClick}/>,
  ]
  // .filter(e => e !== undefined && e !== null && e !== 0);

  return (
    <>
      <Page 
        variant={EPageVariant.LMS}
        header
        footer
        backgroundColor='var(--color-background-alternate)'
      >
        <div className={classes.profilePage}>
          <div className={classes.profilePageContent}>
            <div className={classes.main}>
              <Header authedUser={authedUser} currentCourse={currentCourse} courseLessons={courseLessons} currentCourseAccess={currentCourseAccess}/>
              {blocks.map((block, index) => (
                <div key={index} className={classes.section}>
                  {block}
                </div>
              ))}
            </div>
            <aside className={classes.asideWrapper}></aside>
          </div>
        </div>
      </Page>
      {openedTopic && (
        <LessonsPopup
          courseId={currentCourse.id}
          topic={openedTopic}
          close={() => setOpenedTopic(null)}
        />
      )}
      {buyCoursePopupIsOpened && (
        <BuyPopup
          course={currentCourse}
          user={authedUser}
          close={() => setBuyCoursePopupIsOpened(false)}
        />
      )}
    </>
  );
}

