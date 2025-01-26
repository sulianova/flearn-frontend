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
import SignupToFlearnPopup from 'components/SignupToFlearnPopup/SignupToFlearnPopup';
import { EPageVariant } from '../Page';

import classes from './header.module.scss';
import { CatalogueID } from 'pages/Home/blocks/Catalogue/Catalogue';
import { PricingID } from 'pages/Home/blocks/DecisionForm/DecisionForm';
import { SocialValidationID } from 'pages/Home/blocks/SocialValidation/SocialValidation';

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

  const [popupVisible, setPopupVisible] = useState(false);
  const onNotAuthedClick = () => setPopupVisible(true);

  useEffect(() => {
    if (!visible) {
      currentCloseCourseDropdown.current?.();
    }
  }, [visible]);

  const headerClass = cx({ wrapper: true, _hidden: !visible, IsMobileMenuOpened: mobMenuIsOpened, [variant]: true });

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
      {buyPopupIsOpened && user && <BuyPopup user={user} close={() => setBuyPopupIsOpened(false)}/>}
      {popupVisible &&
        <SignupToFlearnPopup
          close={() => setPopupVisible(false)}
        />
      }
      <div className={headerClass}>
        <div className={cx({ desk: true, [`desk_${variant}`]: true })}>
         {(urlSection.name !== 'Study') && (
            <Link className={classes.logo} to={URLSections.Home.index}>
              <div className={classes.logo__name}>{t('logo')}</div>
              <div className={classes.logo__icon}>
                <Icon icon="Pro"/>
              </div>
            </Link>
         )}
          <div className={classes.menu}>
          {(!isMobile) && (
            <div className={classes.menu__section}>
              {(urlSection.name == 'Home') && (
                <>
                  <a
                    className={classes.nav}
                    href={`/#${CatalogueID}`}
                  >
                    {t('menu.courses')}
                  </a>
                  <a
                    className={classes.nav}
                    href={`/#${PricingID}`}
                  >
                    {t('menu.pricing')}
                  </a>
                  <a
                    className={classes.nav}
                    href={`/#${SocialValidationID}`}
                  >
                    {t('menu.socialValidation')}
                  </a>
                </>
              )}
              {(user && Boolean(userCourses.length)) && (urlSection.name !== 'Study') && (urlSection.name !== 'Home')&& (
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
                      <div className={cx({ dropdown: true, dropdown_isOpened: opened })} onClick={opened ? close : open}>
                        <span className={classes.dropdown__content}>Мои курсы</span>
                        <Icon icon='ChevronDown'/>
                      </div>
                    );
                  }}
                />
              )}
            </div>
          )}
            <div className={classes.menu__btns}>
              {isMobile && (urlSection.name == 'Study') && (
                <Link
                  className={classes.btn_back}
                  to={URLSections.Course.to({ courseId: urlSection.params.courseId })}
                >
                  <Icon icon='ArrowButton' />
                </Link>
              )}
              { user ?
                <>
                  {(urlSection.name === 'Home') && 
                    (<Link
                      className={cx({ btn_login: true})}
                      to={URLSections.EmptyProfile.to()}
                    >
                      {t('btns.login.profile')}
                    </Link>
                  )}
                  {!isMobile && (urlSection.name !== 'Home') && (
                    <div className={cx({ btn_start: true})} onClick={() => setBuyPopupIsOpened(true)}>
                      {t('btns.start.pro')}
                    </div>
                  )}
                </>
                : 
                  <> 
                    {(urlSection.name !== 'Study') && !isMobile && (
                      <>
                        <div className={cx({ btn_login: true})} onClick={() => authService.authenticate()}>
                          {t('btns.login.signIn')}
                        </div>
                        <div
                          className={cx({ btn_start: true})}
                          onClick={onNotAuthedClick}
                        >
                          {t('btns.start.free')}
                        </div>
                      </>
                    )}
                      {(urlSection.name == 'Home') && isMobile && (
                      <>
                        <div className={cx({ btn_login: true})} onClick={() => authService.authenticate()}>
                          {t('btns.login.signIn')}
                        </div>
                        <div
                          className={cx({ btn_start: true})}
                          onClick={onNotAuthedClick}
                        >
                          {t('btns.start.free')}
                        </div>
                      </>
                    )}
                  </>
              }
            </div>
            <div className={classes.btnWrapperRight}>
              {urlSection.name !== 'Home'  && (
                <div className={classes.menuBtn} onClick={() => setMobMenuIsOpened(o => !o)}>
                  <Icon icon='List'/>
                </div>
              )}
          </div>
          </div>
          </div>
      </div>
    </>
  );
}
