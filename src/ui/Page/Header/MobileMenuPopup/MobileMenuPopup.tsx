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
import SignupToFlearnPopup from 'components/SignupToFlearnPopup/SignupToFlearnPopup';

import BuyPopup from 'components/BuyPopup/BuyPopup';
import Icon from 'ui/Icon/Icon';
import Link from 'ui/Link/Link';
import Popup from 'ui/Popup/Popup';

import classes from './MobileMenuPopup.module.scss';

const cx = classnames.bind(classes);

const t = formatI18nT('mobileMenu');

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
  const [popupVisible, setPopupVisible] = useState(false);
  const onNotAuthedClick = () => setPopupVisible(true);

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
      {t('btns.login.profile')}
    </Link>
  );
  const buyCourseBtn = (
      <div
        className={classes.actions__btn}
        onClick={() => setBuyPopupIsOpened(true)}
      >
        {t('btns.start.pro')}
      </div>
  );
  const mobMenuLoginBtn = (
    <div
      className={classes.actions__btn}
      onClick={() => authService.authenticate()}
    >
      {t('btns.login.signIn')}
    </div>
  );
  const mobMenuStartFreeBtn = (
    <div
      className={classes.actions__btn}
      onClick={onNotAuthedClick}
    >
      {t('btns.start.free')}
    </div>
  )
  const mobMenuFirstNotSolvedLessonProfileBtn = (
    <Link
      className={classes.actions__btn}
      to={URLSections.Profile.to({ courseId: lastStudiedCourse?.id ?? 'how-to-draw' })}
      onClick={close}
    >
      {t('btns.login.profile')}
    </Link>
  );
  const mobMenuCurrentLessonProfileBtn = (
    <Link
      className={classes.actions__btn}
      to={URLSections.Profile.to({ courseId: courseId! })}
      onClick={close}
    >
      {t('brns.login.profile')}
    </Link>
  );

  return (
    <>
      {buyPopupIsOpened && user && <BuyPopup user={user} close={() => setBuyPopupIsOpened(false)}/>}
      {popupVisible &&
        <SignupToFlearnPopup
          close={() => setPopupVisible(false)}
        />
      }
      <Popup
        close={close}
        children={startClosingProcess => (
          <div className={classes.mob + ' isMobile'}>
            <div className={classes.close} onClick={startClosingProcess}>
              <Icon icon='Cross' />
            </div>
              <div className={classes.content}>
                <div className={classes.header}>{t('header.menu')}</div>
                {user && (
                    <div className={classes.userWrapper}>
                      <div className={classes.user}>
                        <div className={classes.user__icon}>
                          <Icon icon='UserIcon' />
                        </div>
                        <div className={classes.user__content}>
                          <div className={classes.user__content__name}>{user.displayName}</div>
                          <div className={classes.user__content__email}>{user.email}</div>
                        </div>
                      </div>
                    </div>
                )}
                <div className={classes.itemsGroup}>
                {user && (
                  <Link
                    className={cx({ item: true })}
                    to={URLSections.EmptyProfile.to()}
                    onClick={close}
                  >
                    <div className={classes.item__content}>
                      <span className={classes.item__content__icon}>
                        {(urlSection.name == 'EmptyProfile' ? (<Icon icon="HomeFill"/>) : (<Icon icon="Home"/>))}
                      </span>
                      <span className={classes.item__content__text}>{t('profile')}</span>
                    </div>
                  </Link>
                )}
                  <Link
                    className={cx({ item: true })}
                    to={URLSections.Courses.to()}
                    onClick={close}
                  >
                    <div className={classes.item__content}>
                      <span className={classes.item__content__icon}>
                        {(urlSection.name !== 'EmptyProfile' ? (<Icon icon="CourseFill"/>) : (<Icon icon="Course"/>))}
                      </span>
                      <span className={classes.item__content__text}>{t('allCourses')}</span>
                    </div>
                  </Link>
                </div>
                <div className={classes.itemsGroup}>
                  <div className={cx({ item: true })} onClick={() => frontendSettingsService.update({ theme: theme === 'light' ? 'dark' : 'light' })}>
                    <div className={classes.item__content}>
                      <span className={classes.item__content__icon}><Icon icon="Night"/></span>
                      <span className={classes.item__content__text}>{t('darkTheme')}</span>
                    </div>
                    <div className={cx({ switch: true, switch_off: theme === 'light' })}>
                      <div className={classes.icon}>
                        <div className={classes.fill}></div>
                        <div className={classes.switchPin}></div>
                      </div>
                    </div>
                  </div>
                </div>
                {user && (
                  <div className={classes.itemsGroup}>
                      <div className={cx({ item: true })}>
                        <div
                          className={classes.item__content}
                          onClick={() => authService.logout().then(() => navigate(URLSections.Home.index))}
                        >
                          <span className={classes.item__content__icon}><Icon icon="Logout"/></span>
                          <span className={classes.item__content__text}>{t('logout')}</span>
                        </div>
                      </div>
                  </div>
                )}
                <div className={classes.actions}>
                  {!user ? mobMenuStartFreeBtn :
                      {
                        'Home': buyCourseBtn,
                        'Landing': mobMenuFirstNotSolvedLessonProfileBtn,
                        'Courses': buyCourseBtn,
                        'Course': buyCourseBtn,
                        'Profile': buyCourseBtn,
                        'EmptyProfile': buyCourseBtn,
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
