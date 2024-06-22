import { useParams } from 'react-router';

import { useURLSection } from 'hooks';
import { formatI18nT } from 'shared';
import { authService } from 'services';
import { ICourseData } from 'services/course.service';
import { ILessonData } from 'services/lesson.service';
import { IUserData } from 'services/user.service';
import { URLSections } from 'router';

import Icon from 'ui/Icon/Icon';
import Link from 'ui/Link/Link';
import Popup from 'ui/Popup/Popup';

import classes from '../header.module.scss';

const t = formatI18nT('header');

interface IProps {
  user: IUserData | null
  userCourses: ICourseData[] | undefined
  firstNotSolvedLesson: ILessonData | null
  currentLesson?: ILessonData
  topicLessons: Array<ILessonData & { solved: boolean, canBeAccessed: boolean }> | undefined
  close: () => void
}

export default function MobileMenuPopup(props: Readonly<IProps>) {
  const { user, userCourses, firstNotSolvedLesson, currentLesson, topicLessons, close } = props;
  const { courseId } = useParams();
  const urlSection = useURLSection();

  const mobMenuLessonsList = topicLessons?.map(lesson => (
    <div className={classes.mobItem} key={lesson.id}>
      <Link
        to={URLSections.Study.to({ courseId: courseId!, lessonId: lesson.id })}
        onClick={close}
      >
        <span className='inline-text'>{lesson.title}</span>
      </Link>
    </div>
  ));
  const mobMenuCoursesList = userCourses?.map(course => (
    <div className={classes.mobItem} key={course.id}>
      <Link
        to={URLSections.Profile.to({ courseId: course.id })}
        onClick={close}
      >
        <span className='inline-text'>{course.title}</span>
      </Link>
    </div>
  ));
  const homeBtn = (
    <Link
      className={classes.loginBtn}
      to={URLSections.Home.index}
      onClick={close}
    >
      Все курсы
    </Link>
  );
  const mobMenuLoginBtn = (
    <div
      className={classes.loginBtn}
      onClick={() => authService.authenticate()}
    >
      {t('login.signIn')}
    </div>
  );
  const mobMenuFirstNotSolvedLessonProfileBtn = (
    <Link
      className={classes.loginBtn}
      to={firstNotSolvedLesson ? URLSections.Profile.to({ courseId: firstNotSolvedLesson.courseId }) : URLSections.EmptyProfile.index}
      onClick={close}
    >
      {t('login.profile')}
    </Link>
  );
  const mobMenuCurrentLessonProfileBtn = (
    <Link
      className={classes.loginBtn}
      to={URLSections.Profile.to({ courseId: courseId! })}
      onClick={close}
    >
      {t('login.profile')}
    </Link>
  );

  return (
    <Popup>
      <div className={classes.mob + ' isMobile'}>
        <div className={classes.close} onClick={close}>
          <Icon icon='Cross' />
        </div>
          <div className={classes.mobMenuMain}>
            {!user ? null :
              urlSection === 'Study' ? (<>
                <div>{currentLesson?.topic}</div>
                {mobMenuLessonsList}
              </>) : (<>
                <div>{mobMenuCoursesList?.length ? 'Мои курсы:' : 'У вас пока нет курсов'}</div>
                {mobMenuCoursesList}
              </>)
            }
          </div>
          <div className={classes.mobMenuControls}>
            {!user ? mobMenuLoginBtn :
              {
                'Home': mobMenuFirstNotSolvedLessonProfileBtn,
                'Course': mobMenuFirstNotSolvedLessonProfileBtn,
                'Profile': homeBtn,
                'EmptyProfile': homeBtn,
                'Study': mobMenuCurrentLessonProfileBtn,
                'Other': null,
              }[urlSection]
            }
          </div>
      </div>
    </Popup>
  );
}
