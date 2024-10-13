import classnames from 'classnames/bind';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

import { useIsMobile, useURLSection } from 'hooks';
import { formatI18nT } from 'shared';
import { authService } from 'services';
import { courseService, ICourseData } from 'services/course.service';
import { ILessonData } from 'services/lesson.service';
import { IUserData } from 'services/user.service';
import { URLSections } from 'router';
import { frontendSettingsService } from 'services/frontendSettings.service';

import BuyPopup from 'components/BuyPopup/BuyPopup';
import Icon from 'ui/Icon/Icon';
import Link from 'ui/Link/Link';
import Popup from 'ui/Popup/Popup';

import classes from './MobileMenuPopup.module.scss';

const cx = classnames.bind(classes);

const t = formatI18nT('header');

interface IProps {
  user: IUserData | null
  userCourses: ICourseData[] | undefined
  lastStudiedCourse: ICourseData | null
  currentLesson?: ILessonData
  topicLessons: Array<ILessonData & { solved: boolean, canBeAccessed: boolean }> | undefined
  close: () => void
}

export default function MobileMenuPopup(props: Readonly<IProps>) {
  const { user, userCourses, lastStudiedCourse, currentLesson, topicLessons, close } = props;
  const { courseId, lessonId } = useParams();
  const urlSection = useURLSection();
  const isMobile = useIsMobile();
  const { theme } = frontendSettingsService.useFrontendSettings();
  const navigate = useNavigate();
  const [buyPopupIsOpened, setBuyPopupIsOpened] = useState(false);
  const currentCourse = courseService.useCurrentCourse();

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
      to={URLSections.Course.to({ courseId: course.id })}
      onClick={close}
      
      className={cx({
          item: true,
          active: {
            'Home': course.id === lastStudiedCourse?.id,
            'Landing': course.id === lastStudiedCourse?.id,
            'Courses': course.id === lastStudiedCourse?.id,
            'Course': course.id === courseId,
            'Profile': course.id === lastStudiedCourse?.id,
            'EmptyProfile': course.id === lastStudiedCourse?.id,
            'Study': false,
            'Other': false,
          }[urlSection.name]
        })} key={course.id}>
        <span className={classes.item__text}>{course.title}</span>
    </Link>
  ));
  const homeBtn = (
    <Link
      className={classes.actions__btn}
      to={URLSections.Home.index}
      onClick={close}
    >
      Все курсы
    </Link>
  );
  const buyCourseBtn = (
      <div
        className={classes.actions__btn}
        onClick={() => setBuyPopupIsOpened(true)}
      >
        Купить полный курс
      </div>
  );
  const mobMenuLoginBtn = (
    <div
      className={classes.actions__btn}
      onClick={() => authService.authenticate()}
    >
      {t('login.signIn')}
    </div>
  );
  const mobMenuFirstNotSolvedLessonProfileBtn = (
    <Link
      className={classes.actions__btn}
      to={URLSections.Profile.to({ courseId: lastStudiedCourse?.id ?? 'how-to-draw' })}
      onClick={close}
    >
      {t('login.profile')}
    </Link>
  );
  const mobMenuCurrentLessonProfileBtn = (
    <Link
      className={classes.actions__btn}
      to={URLSections.Profile.to({ courseId: courseId! })}
      onClick={close}
    >
      {t('login.profile')}
    </Link>
  );

  return (
    <>
      {buyPopupIsOpened && user && <BuyPopup user={user} close={() => setBuyPopupIsOpened(false)}/>}
      <Popup
        close={close}
        children={startClosingProcess => (
          <div className={classes.mob + ' isMobile'}>
            <div className={classes.close} onClick={startClosingProcess}>
              <Icon icon='Cross' />
            </div>
              <div className={classes.content}>
                {user &&  urlSection.name !== 'Study' &&(
                    <div className={classes.userEmail}>{user.email}</div>
                )}
                  {!user ? null :
                      urlSection.name === 'Study' ? (<>
                      <div className={classes.itemsGroup}>
                        <div className={classes.header}><div className={classes.title}>{currentLesson?.topic}</div></div>
                        {mobMenuLessonsList}
                      </div>
                      </>) : (<>
                        {/* {mobMenuCoursesList} */}
                      </>)
                    }
                <div className={classes.itemsGroup}>
                  {isMobile && (
                    <div className={cx({ item: true })} onClick={() => frontendSettingsService.update({ theme: theme === 'light' ? 'dark' : 'light' })}>
                      {theme === 'dark' ?
                        (<>
                          <span className={classes.item__text}>Светлая тема</span>
                          <span className={classes.item__icon}><Icon icon="Day"/></span>
                        </>
                        )
                      : (
                        <>
                          <span className={classes.item__text}>Темная тема</span>
                          <span className={classes.item__icon}><Icon icon="Night"/></span>
                        </>
                        )}
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
                <div className={classes.actions}>
                  {!user ? mobMenuLoginBtn :
                      {
                        'Home': mobMenuFirstNotSolvedLessonProfileBtn,
                        'Landing': mobMenuFirstNotSolvedLessonProfileBtn,
                        'Courses': mobMenuFirstNotSolvedLessonProfileBtn,
                        'Course': mobMenuFirstNotSolvedLessonProfileBtn,
                        'Profile': buyCourseBtn,
                        'EmptyProfile': homeBtn,
                        'Study': buyCourseBtn,
                        'Other': null,
                      }[urlSection.name]
                    }
                  </div>
              </div>
          </div>
        )}
      />
    </>
  );
}
