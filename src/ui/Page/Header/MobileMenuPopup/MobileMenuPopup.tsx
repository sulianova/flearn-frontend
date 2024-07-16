import classnames from 'classnames/bind';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

import { useIsMobile, useURLSection } from 'hooks';
import { formatI18nT } from 'shared';
import { authService } from 'services';
import { ICourseData } from 'services/course.service';
import { ILessonData } from 'services/lesson.service';
import { IUserData } from 'services/user.service';
import { URLSections } from 'router';
import { frontendSettingsService } from 'services/frontendSettings.service';

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
  const isMobile = useIsMobile();
  const { theme } = frontendSettingsService.useFrontendSettings();
  const navigate = useNavigate();

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
    <Link
      to={URLSections.Profile.to({ courseId: course.id })}
      onClick={close}
      
      className={cx({
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
        <span className={classes.mobItemText + ' inline-text'}>{course.title}</span>
    </Link>
  ));
  const homeBtn = (
    <Link
      className={classes.navBtn}
      to={URLSections.Home.index}
      onClick={close}
    >
      Все курсы
    </Link>
  );
  const mobMenuLoginBtn = (
    <div
      className={classes.navBtn}
      onClick={() => authService.authenticate()}
    >
      {t('login.signIn')}
    </div>
  );
  const mobMenuFirstNotSolvedLessonProfileBtn = (
    <Link
      className={classes.navBtn}
      to={firstNotSolvedLesson ? URLSections.Profile.to({ courseId: firstNotSolvedLesson.courseId }) : URLSections.EmptyProfile.index}
      onClick={close}
    >
      {t('login.profile')}
    </Link>
  );
  const mobMenuCurrentLessonProfileBtn = (
    <Link
      className={classes.navBtn}
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
            <div className={classes.itemsGroup}>
              {user &&  urlSection.name !== 'Study' &&(
                <div className={classes.item}>
                  <div className={classes.userEmail}>{user.email}</div>
                </div>
              )}
              {!user ? null :
                  urlSection.name === 'Study' ? (<>
                    <div className={classes.header}><div className={classes.title}>{currentLesson?.topic}</div></div>
                    {mobMenuLessonsList}
                  </>) : (<>
                    {/* <div className={classes.listOptionTitle}>{mobMenuCoursesList?.length ? 'Мои курсы:' : 'У вас пока нет курсов'}</div> */}
                    {mobMenuCoursesList}
                  </>)
                }
            </div>
            <div className={classes.itemsGroup}>
              {isMobile && (
                <div className={cx({ item: true })} onClick={() => frontendSettingsService.update({ theme: theme === 'light' ? 'dark' : 'light' })}>
                  <div className={classes.itemTitle}>
                    <div className={classes.withIcon}>
                      <span>Темная тема</span>
                      <Icon icon='Night'/>
                    </div>
                  </div>
                </div>
              )}
              {user &&  urlSection.name === 'Profile' && (
                <div className={cx({ item: true })}>
                  <div
                    className={classes.itemTitle}
                    style={{width: 'max-content'}}
                    onClick={() => authService.logout().then(() => navigate(URLSections.Home.index))}
                  >
                    Выйти из профиля
                  </div>
                </div>
              )}
            </div>
              <div className={classes.mobMenuControls}>
                {!user ? mobMenuLoginBtn :
                    {
                      'Home': mobMenuFirstNotSolvedLessonProfileBtn,
                      'Course': mobMenuFirstNotSolvedLessonProfileBtn,
                      'Profile': homeBtn,
                      'EmptyProfile': homeBtn,
                      'Study': homeBtn,
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
