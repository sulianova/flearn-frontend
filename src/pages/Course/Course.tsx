
import Page, { EPageVariant } from 'ui/Page/Page';

import { type IUserData, userService } from 'services/user.service';
import { type ILessonData, lessonService } from 'services/lesson.service';
import { type ICourseData, courseService } from 'services/course.service';
import { type TAccess, userAccessService } from 'services/userAccess.service';

import Header from './blocks/Header/Header';
import CoursePage from './blocks/CoursePage/CoursePage';
import Description from './blocks/Description/Description';
import SocialValidation from './blocks/SocialValidation/SocialValidation';
// import Catalogue from './blocks/Catalogue/Catalogue';

import classes from './Course.module.scss'
import Fallback from 'ui/Fallback';

export default function Course() {
  const authedUser = userService.useAuthedUser();
  const currentCourse = courseService.useCurrentCourse();
  const currentCourseAccess = userAccessService.useCurrentCourseAccess();

  if (!currentCourse) {
    return (
      <Fallback.Pending
        text='Loading course'
        variant={EPageVariant.LMS}
      />
    );
  }

  const {
    description,
    feedbacks
  } = currentCourse.content;
  const blocks: JSX.Element[] = [
    // <CoursePage
    //   key='CoursePage'
    //   authedUser={authedUser}
    //   currentCourse={currentCourse}
    //   courseLessons={courseLessons}
    //   currentCourseAccess={currentCourseAccess}
    // />,
    description && <Description
      key='Description'
      type={currentCourse.type}
      description={description}
    />,
    feedbacks && feedbacks.length && <SocialValidation
      key='SocialValidation'
      feedbacks={feedbacks}
    />,
    // <BannerStart
    //   key='BannerStart'
    // />,
    // <Catalogue
    //   key='Catalogue'
    // />,
    // <FAQ
    //   key='FAQ'
    // />,
  ].filter(c => c !== undefined && c !== 0);

  return (
      <>
        <Page 
          variant={EPageVariant.LMS}
          header
          footer
          backgroundColor='var(--color-background-alternate)'
        >
          <div className={classes.coursesPage}>
            <div className={classes.coursesPageContent}>
              <Header
                authedUser={authedUser}
                currentCourse={currentCourse}
                currentCourseAccess={currentCourseAccess}
              />
              {blocks.map((block, index) => (
                <div key={index} className={classes.section}>
                  {block}
                </div>
              ))}
            </div>
          </div>
        </Page>
      </>
  );
}