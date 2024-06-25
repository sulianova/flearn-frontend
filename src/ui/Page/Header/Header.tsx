import classnames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import { useIsMobile, useURLSection } from 'hooks';
import { formatI18nT } from 'shared';
import { authService } from 'services';
import { userService } from 'services/user.service';
import { URLSections } from 'router';
import { formatCourseDiscount, getCourseBaseDiscountAmountPrc } from 'utils';

import BuyPopup from 'components/BuyPopup/BuyPopup';
import Dropdown from 'ui/Dropdown/Dropdown';
import Icon from 'ui/Icon/Icon';
import Link from 'ui/Link/Link';

import CoursesDropdownContent from './CoursesDropdownContent/CoursesDropdownContent';
import MobileMenuPopup from './MobileMenuPopup/MobileMenuPopup';
import { EPageVariant } from '../Page';
import UserPopup from '../Sidebar/UserPopup/UserPopup';

import classes from './header.module.scss';
import { usePageSource } from 'hooks/pageSource';

const cx = classnames.bind(classes);
const t = formatI18nT('header');

interface IProps {
  variant: EPageVariant
  visible: boolean
}

export default function Header({ variant, visible }: Readonly<IProps>) {
  const {
    currentCourse,
    userCourses,
    currentLesson,
    firstNotSolvedLesson,
    topicLessons,
  } = usePageSource();
  const urlSection = useURLSection();
  const isMobile = useIsMobile();
  const user = userService.useAuthedUser();
  const currentCloseCourseDropdown = useRef<() => void>();
  const [mobMenuIsOpened, setMobMenuIsOpened] = useState(false);
  const [buyPopupIsOpened, setBuyPopupIsOpened] = useState(false);
  const [userPopupVisible, setUserPopupVisible] = useState(false);

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
          firstNotSolvedLesson={firstNotSolvedLesson}
          currentLesson={currentLesson}
          topicLessons={topicLessons}
          close={() => setMobMenuIsOpened(false)}
        />
      )}
      {buyPopupIsOpened && currentCourse && user && <BuyPopup user={user} course={currentCourse} close={() => setBuyPopupIsOpened(false)}/>}
      <div className={headerClass}>
        <div className={cx({ desk: true, [`deskPadding${variant}`]: true })}>
          { urlSection !== 'Study' && (
            <div className={classes.logo}>
              <div className={classes.logoWrapper}>
                <Link to={URLSections.Home.index}><Icon icon='Logo'/></Link>
              </div>
            </div>
          )}
          <div className={classes.nav}>
            {variant === EPageVariant.LMS && (
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
                    firstNotSolvedLesson={firstNotSolvedLesson}
                    close={close}
                  />
                )}
                children={({ open, close, opened }) => {
                  currentCloseCourseDropdown.current = close;
                  return (
                    <div className={cx({ navContent: true, navItem: true, selectToggleIsOpened: opened })} onClick={opened ? close : open}>
                      <span className={classes.selectToggleContent}>Мои курсы</span>
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
                  <div className={cx({ buyBtn: true})}>Купить полный курс</div>
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
