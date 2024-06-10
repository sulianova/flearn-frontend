import classnames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import { formatI18nT, i18n } from 'shared';
import { authService } from 'services/auth.service';
import { ICourseData, courseService } from 'services/course.service';
import { userService } from 'services/user.service';
import { URLSections } from 'router';

import SelectToggleIcon from 'assets/images/Svg/SelectToggleIcon';
import Link from 'ui/Link/Link';
import List from 'assets/images/Svg/List';

import { EPageVariant } from '../Page';
import classes from './header.module.scss';
import Dropdown from 'ui/Dropdown/Dropdown';
import CoursesDropdownContent from './CoursesDropdownContent/CoursesDropdownContent';
import { userCourseProgressService } from 'services/userCourseProgress.service';
import BuyPopup from 'components/BuyPopup/BuyPopup';

const cx = classnames.bind(classes);
const t = formatI18nT('header');

interface IProps {
  variant: EPageVariant
  visible: boolean
}

export default function Header({ variant, visible }: Readonly<IProps>) {
  const user = userService.useAuthedUser();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [userCourses, setUserCourses] = useState<ICourseData[]>();
  const currentCloseCourseDropdown = useRef<() => void>();
  const lastSolvedLesson = userCourseProgressService.useLastSolvedLesson();
  const [buyPopupIsOpened, setBuyPopupIsOpened] = useState(false);

  const userId = user?.id;
  useEffect(() => {
    if (!userId) {
      return;
    }
  
    let cancelled = false;
    const s = courseService
      .getCourseBS({ userId })
      .subscribe(action => {
        if (!action || (action instanceof Error) || cancelled) {
          return;
        }

        setUserCourses(action.courses);
      });
    return () => {
      s.unsubscribe();
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflowY = 'hidden';

      return () => {
        document.body.style.overflowY = '';
      };
    }
  }, [isOpened]);

  useEffect(() => {
    if (!visible) {
      currentCloseCourseDropdown.current?.();
    }
  }, [visible]);

  const headerClass = cx({ __: true, __Hidden: !visible, IsMobileMenuOpened: isOpened, [variant]: true });

  return (
    <>
      {buyPopupIsOpened && <BuyPopup close={() => setBuyPopupIsOpened(false)}/>}
      <div className={headerClass} data-is-mobile-menu-opened={isOpened}>
        <div className={cx({ desk: true, [`deskPadding${variant}`]: true })}>
          {variant !== EPageVariant.LMS && (
            <div className={classes.logo}>
              <div className={classes.logoWrapper}>
                <Link to={URLSections.Home.index}>{i18n.t('logo')}</Link>
              </div>
            </div>
          )}
          <div className={classes.nav}>
            {user && (
              <Dropdown
                content={({ close }) => (
                  <CoursesDropdownContent
                    courses={userCourses}
                    close={close}
                  />
                )}
                children={({ open, close, opened }) => {
                  currentCloseCourseDropdown.current = close;
                  return (
                    <div className={cx({ navContent: true, navItem: true, selectToggleIsOpened: opened })} onClick={opened ? close : open}>
                      <span className={classes.selectToggleContent}>мои курсы</span>
                      <span className={classes.selectToggleIcon}><SelectToggleIcon/></span>
                    </div>
                  );
                }}
              />
            )}
            {
              variant === EPageVariant.LMS ? (
                <div className={cx({ navBuy: true, navItem: true })} onClick={() => setBuyPopupIsOpened(true)}>
                  <div className={cx({ buyBtn: true})}>купить полный курс</div>
                  <div className={classes.buyBadge + ' s-text-14'}>-5%</div>
                </div>
              ) : (
                <div className={cx({ navLogin: true, navItem: true })}>
                  {user ?
                    (<Link to={lastSolvedLesson ? URLSections.Course.Lessons.to({ courseId: lastSolvedLesson.courseId }) : undefined}>{t('login.profile')}</Link>)
                    : (<div onClick={() => authService.authenticate()}>{t('login.signIn')}</div>)
                  }
                </div>
              )
            }
          </div>
          <div className={classes.humburger} onClick={() => setIsOpened(o => !o)}><List/></div>
          </div>
        <div className={classes.mob}>
          <div className={classes.mobMenuMain}>
            <div className={classes.mobItem}>
              <Link
                className='inline-link s-text-36'
                to={URLSections.Home.index}
                onClick={() => setIsOpened(false)}
              >
                <span className='inline-text'>{t('catalogue')}</span>
              </Link>
            </div>
          </div>
          <div className={classes.mobMenuControls}>
            {user ? (
              <Link
                className={classes.loginBtn + ' s-text-24'}
                to={lastSolvedLesson ? URLSections.Course.Lessons.to({ courseId: lastSolvedLesson.courseId }) : undefined}
                onClick={() => setIsOpened(false)}
              >
                {t('login.profile')}
              </Link>
            ) : (
              <div
                className={classes.loginBtn + ' s-text-24'}
                onClick={() => authService.authenticate()}
              >
                {t('login.signIn')}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
