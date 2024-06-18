import classnames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

import { useIsMobile, useURLSection } from 'hooks';
import { formatI18nT } from 'shared';
import { authService } from 'services/auth.service';
import { ICourseData, courseService } from 'services/course.service';
import { userService } from 'services/user.service';
import { userCourseProgressService } from 'services/userCourseProgress.service';
import { URLSections } from 'router';
import { formatCourseDiscount, getCourseBaseDiscountAmountPrc } from 'utils';

import BuyPopup from 'components/BuyPopup/BuyPopup';
import Dropdown from 'ui/Dropdown/Dropdown';
import Icon from 'ui/Icon/Icon';
import Link from 'ui/Link/Link';
import Popup from 'ui/Popup/Popup';

import CoursesDropdownContent from './CoursesDropdownContent/CoursesDropdownContent';
import { EPageVariant } from '../Page';
import UserPopup from '../Sidebar/UserPopup/UserPopup';

import classes from './header.module.scss';

const cx = classnames.bind(classes);
const t = formatI18nT('header');

interface IProps {
  variant: EPageVariant
  visible: boolean
}

export default function Header({ variant, visible }: Readonly<IProps>) {
  const { courseId } = useParams();
  const urlSection = useURLSection();
  const isMobile = useIsMobile();
  const user = userService.useAuthedUser();
  const firstNotSolvedLesson = userCourseProgressService.useFirstNotSolvedLesson();
  const [currentCourse, setCurrentCourse] = useState<ICourseData | undefined>(undefined);
  const [userCourses, setUserCourses] = useState<ICourseData[]>();
  const currentCloseCourseDropdown = useRef<() => void>();
  const [mobMenuIsOpened, setMobMenuIsOpened] = useState(false);
  const [buyPopupIsOpened, setBuyPopupIsOpened] = useState(false);
  const [userPopupVisible, setUserPopupVisible] = useState(false);

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

        setCurrentCourse(action.courses.at(0));
      });
    return () => {
      s.unsubscribe();
      cancelled = true;
    };
  }, [courseId]);

  useEffect(() => {
    if (mobMenuIsOpened) {
      document.body.style.overflowY = 'hidden';

      return () => {
        document.body.style.overflowY = '';
      };
    }
  }, [mobMenuIsOpened]);

  useEffect(() => {
    if (!visible) {
      currentCloseCourseDropdown.current?.();
    }
  }, [visible]);

  const headerClass = cx({ __: true, __Hidden: !visible, IsMobileMenuOpened: mobMenuIsOpened, [variant]: true });

  const mobMenuPopup = (
    <Popup>
      <div className={classes.mob + ' isMobile'}>
        <div className={classes.close} onClick={() => setMobMenuIsOpened(false)}>
          <Icon icon='Cross' />
        </div>
        <div className={classes.mobMenuMain}>
            <div className={classes.mobItem}>
              <Link
                to={URLSections.Home.index}
                onClick={() => setMobMenuIsOpened(false)}
              >
                <span className='inline-text'>{t('catalogue')}</span>
              </Link>
            </div>
          </div>
          <div className={classes.mobMenuControls}>
            {user ? (
              <Link
                className={classes.loginBtn}
                to={firstNotSolvedLesson ? URLSections.Profile.to({ courseId: firstNotSolvedLesson.courseId }) : URLSections.EmptyProfile.index}
                onClick={() => setMobMenuIsOpened(false)}
              >
                {t('login.profile')}
              </Link>
            ) : (
              <div
                className={classes.loginBtn}
                onClick={() => authService.authenticate()}
              >
                {t('login.signIn')}
              </div>
            )}
          </div>
      </div>
    </Popup>
  );

  return (
    <>
      {isMobile && mobMenuIsOpened && mobMenuPopup}
      {buyPopupIsOpened && currentCourse && <BuyPopup course={currentCourse} close={() => setBuyPopupIsOpened(false)}/>}
      <div className={headerClass} data-is-mobile-menu-opened={mobMenuIsOpened}>
        <div className={cx({ desk: true, [`deskPadding${variant}`]: true })}>
          {variant !== EPageVariant.LMS && (
            <div className={classes.logo}>
              <div className={classes.logoWrapper}>
                <Link to={URLSections.Home.index}><Icon icon='Logo'/></Link>
                {/* <Link to={URLSections.Home.index}>{i18n.t('logo')}</Link> */}
              </div>
            </div>
          )}
          <div className={classes.nav}>
            {urlSection === 'Study' && (
              <div className={cx({ userSettinsWrapper: true, open: userPopupVisible })}>
                {user && userPopupVisible && (
                    <UserPopup
                      user={user}
                      close={() => setUserPopupVisible(false)}
                    />
                  )}
                <div 
                  className={classes.userSettings}
                  onClick={() => setUserPopupVisible(!userPopupVisible)}
                >
                  <Icon icon='User'/>
                </div>
              </div>
            )}
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
                      <span className={classes.selectToggleIcon}><Icon icon='SelectToggleIcon'/></span>
                    </div>
                  );
                }}
              />
            )}
            {
              urlSection === 'EmptyProfile' ? null :
              variant === EPageVariant.LMS ? (
                <div className={cx({ navBuy: true, navItem: true })} onClick={() => setBuyPopupIsOpened(true)}>
                  <div className={cx({ buyBtn: true})}>купить полный курс</div>
                  {getCourseBaseDiscountAmountPrc(currentCourse?.discount) && (
                    <div className={classes.buyBadge}>{formatCourseDiscount(getCourseBaseDiscountAmountPrc(currentCourse?.discount)!)}</div>
                  )}
                </div>
              ) : (
                <div className={cx({ navLogin: true, navItem: true })}>
                  {user ?
                    (<Link to={firstNotSolvedLesson ? URLSections.Profile.to({ courseId: firstNotSolvedLesson.courseId }) : URLSections.EmptyProfile.index}>{t('login.profile')}</Link>)
                    : (<div onClick={() => authService.authenticate()}>{t('login.signIn')}</div>)
                  }
                </div>
              )
            }
          </div>
          <div className={cx({ humburger: true})} onClick={() => setMobMenuIsOpened(o => !o)}>
            <Icon icon='List'/>
          </div>
          </div>
      </div>
      
    </>
  );
}
