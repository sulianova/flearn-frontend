import classnames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import { useIsMobile, useURLSection } from 'hooks';
import { formatI18nT } from 'shared';
import { authService } from 'services';
import { courseService } from 'services/course.service';
import { userCourseProgressService } from 'services/userCourseProgress.service';
import { userService } from 'services/user.service';
import { lessonService } from 'services/lesson.service';
import { URLSections } from 'router';

import BuyPopup from 'components/BuyPopup/BuyPopup';
import Dropdown from 'ui/Dropdown/Dropdown';
import Icon from 'ui/Icon/Icon';
import Link from 'ui/Link/Link';

import CoursesDropdownContent from './CoursesDropdownContent/CoursesDropdownContent';
import MobileMenuPopup from './MobileMenuPopup/MobileMenuPopup';
import { EPageVariant } from '../Page';

import classes from './header.module.scss';

const cx = classnames.bind(classes);
const t = formatI18nT('header');

interface IProps {
  variant: EPageVariant
  visible: boolean
}

export default function Header({ variant, visible }: Readonly<IProps>) {
  const urlSection = useURLSection();
  const isMobile = useIsMobile();

  const user = userService.useAuthedUser();
  const currentCourse = courseService.useCurrentCourse()
  const userCourses = courseService.useUserCourses() ?? [];
  const lastStudiedCourse = userCourseProgressService.useLastStudiedCourse();
  const currentLesson = lessonService.useCurrentLesson() ?? undefined;
  const topicLessons = lessonService.useTopicLessons({ topic: currentLesson?.topic }) ?? [];

  const currentCloseCourseDropdown = useRef<() => void>();
  const [mobMenuIsOpened, setMobMenuIsOpened] = useState(false);
  const [buyPopupIsOpened, setBuyPopupIsOpened] = useState(false);

  useEffect(() => {
    if (!visible) {
      currentCloseCourseDropdown.current?.();
    }
  }, [visible]);

  const headerClass = cx({ __: true, __Hidden: !visible, IsMobileMenuOpened: mobMenuIsOpened, [variant]: true });

  return (
    <>
      {isMobile && mobMenuIsOpened && (
        <MobileMenuPopup
          user={user}
          userCourses={userCourses}
          lastStudiedCourse={lastStudiedCourse}
          currentLesson={currentLesson}
          topicLessons={topicLessons}
          close={() => setMobMenuIsOpened(false)}
        />
      )}
      {buyPopupIsOpened && currentCourse && user && <BuyPopup user={user} course={currentCourse} close={() => setBuyPopupIsOpened(false)}/>}
      <div className={headerClass}>
        <div className={cx({ desk: true, [`deskPadding${variant}`]: true })}>
         {(urlSection.name !== 'Study') && (
            <Link className={classes.logoWrapper} to={URLSections.Home.index}>
              <Icon icon='Logo'/>
              <div>{t('logo')}</div>
            </Link>
         )}
          <div className={classes.nav}>
            <div className={classes.navMob}>
            {(urlSection.name === 'Study') && (
              <div className={classes.userSettingsWrapper}>
                  <Link
                    className={classes.userSettings}
                    to={URLSections.Profile.to({ courseId: urlSection.params.courseId })}
                  >
                    <Icon icon='ArrowButton' />
                  </Link>
              </div>
            )}
            </div>
            {(user && !isMobile) && (urlSection.name !== 'Study') && (
              <Dropdown
                content={({ close }) => (
                  <CoursesDropdownContent
                    courses={userCourses}
                    lastStudiedCourse={lastStudiedCourse}
                    close={close}
                  />
                )}
                children={({ open, close, opened }) => {
                  currentCloseCourseDropdown.current = close;
                  return (
                    <div className={cx({ navContent: true, navItem: true, selectToggleIsOpened: opened }) + ' s-hoverable'} onClick={opened ? close : open}>
                      <span className={classes.selectToggleContent}>Мои курсы</span>
                      <span className={classes.selectToggleIcon}><Icon icon='SelectToggleIcon'/></span>
                    </div>
                  );
                }}
              />
            )}
            {
              urlSection.name === 'EmptyProfile' ? null :
              (urlSection.name === 'Profile' || urlSection.name === 'Study') ? (
                isMobile ? null :
                (
                  <div className={cx({ navBuy: true, navItem: true })} onClick={() => setBuyPopupIsOpened(true)}>
                    <div className={cx({ buyBtn: true})}>Купить полный курс</div>
                    {/* {getCourseBaseDiscountAmountPrc(currentCourse?.discount) && (
                      <div className={classes.buyBadge}>{formatCourseDiscount(getCourseBaseDiscountAmountPrc(currentCourse?.discount)!)}</div>
                    )} */}
                  </div>
                )
              ) : (
                <>
                  {user ?
                    (<Link className={cx({ navLogin: true, navItem: true })} to={URLSections.Profile.to({ courseId: lastStudiedCourse?.id ?? 'how-to-draw' })}>{t('login.profile')}</Link>)
                    : (<div className={cx({ navLogin: true, navItem: true })} onClick={() => authService.authenticate()}>{t('login.signIn')}</div>)
                  }
                </>
              )
            }
          </div>
          </div>
      </div>
      
    </>
  );
}
