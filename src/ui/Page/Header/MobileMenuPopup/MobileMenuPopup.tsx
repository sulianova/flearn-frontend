import classnames from 'classnames/bind';
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

import classes from './MobileMenuPopup.module.scss';
const cx = classnames.bind(classes);

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
  const { courseId, lessonId } = useParams();
  const urlSection = useURLSection();

  const mobMenuLessonsList = topicLessons?.map(lesson => (
    <Link
      key={lesson.id}
      to={lesson.canBeAccessed ? URLSections.Study.to({ courseId: courseId!, lessonId: lesson.id }) : undefined}
      onClick={close}
      className={cx({ navigationItem: true, solved: lesson.solved, disabled: !lesson.canBeAccessed, active: lesson.id === lessonId })}
    >
      <div className={classes.navigationItemTitle}>
          <span className={classes.navigationItemIndex}>{lesson.orderInTopic}.</span>
          {lesson.title}
      </div>
      <div className={classes.navigationItemInfo}>
        <div className={classes.infoItem}>
          <div className={cx({ infoIcon: true, itemStatus: true })}>
            {!lesson.canBeAccessed && <Icon icon='Lock'/>}
            {lesson.solved && <Icon icon='Tick'/>}
          </div>
        </div>
      </div>
    </Link>
  ));
  const mobMenuCoursesList = userCourses?.map(course => (
    <div className={cx({
        mobItem: true,
        active: {
          'Home': course.id === firstNotSolvedLesson?.courseId,
          'Course': course.id === firstNotSolvedLesson?.courseId,
          'Profile': course.id === courseId,
          'EmptyProfile': course.id === courseId,
          'Study': false,
          'Other': false,
        }[urlSection.name]
      })} key={course.id}>
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
    <Popup
      close={close}
      children={startClosingProcess => (
        <div className={classes.mob + ' isMobile'}>
          <div className={classes.close} onClick={startClosingProcess}>
            <Icon icon='Cross' />
          </div>
            <div className={classes.mobMenuMain}>
              {!user ? null :
                urlSection.name === 'Study' ? (<>
                  <div className={classes.title}>{currentLesson?.topic}</div>
                  {mobMenuLessonsList}
                </>) : (<>
                  <div className={classes.listOptionTitle}>{mobMenuCoursesList?.length ? 'Мои курсы:' : 'У вас пока нет курсов'}</div>
                  {mobMenuCoursesList}
                </>)
              }
              <div className={classes.mobMenuControls}>
                {!user ? mobMenuLoginBtn :
                    {
                      'Home': mobMenuFirstNotSolvedLessonProfileBtn,
                      'Course': mobMenuFirstNotSolvedLessonProfileBtn,
                      'Profile': homeBtn,
                      'EmptyProfile': homeBtn,
                      'Study': null,
                      'Other': null,
                    }[urlSection.name]
                  }
                </div>
            </div>
        </div>
      )}
    />
  );
}
