import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { userService } from 'services/user.service';
import { formatI18nT, i18n } from 'shared';
import store from 'store';
import { login } from 'store/actions/sagas';
import { URLSections } from 'types';

import SelectToggleIcon from 'assets/images/Svg/SelectToggleIcon';
import Link from 'ui/Link/Link';
import List from 'assets/images/Svg/List';
import { MenuHTMLAttributes } from 'react';

import { EPageVariant } from '../Page';
import classes from './header.module.scss';
import Dropdown from 'ui/Dropdown/Dropdown';
import CoursesDropdownContent from './CoursesDropdownContent/CoursesDropdownContent';
import { ICourseData, courseService } from 'services/course.service';

const cx = classnames.bind(classes);
const t = formatI18nT('header');

interface IProps {
  variant: EPageVariant
}

export default function Header({ variant }: Readonly<IProps>) {
  const user = userService.useAuthedUser();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [userCourses, setUserCourses] = useState<ICourseData[]>();

  const userId = user?.id;
  useEffect(() => {
    if (!userId) {
      return;
    }
  
    let cancelled = false;
    const s = courseService
      .getCourseBS({ filter: { userId }})
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

  const headerClass = cx({ _: true, __Hidden: false, IsMobileMenuOpened: isOpened, [variant]: true });

  return (
    <div className={headerClass} data-is-mobile-menu-opened={isOpened}>
      <div className={cx({ desk: true, [`deskPadding${variant}`]: true })}>
        <div className={classes.logo}>
          <div className={classes.logoWrapper}>
            <Link to={URLSections.Home.index}>{i18n.t('logo')}</Link>
          </div>
        </div>
        <div className={classes.nav}>
          <Dropdown
            content={({ close }) => (
              <CoursesDropdownContent
                courses={userCourses}
                close={close}
              />
            )}
            children={({ open, close, opened }) => (
              <div className={cx({ navContent: true, navItem: true, selectToggleIsOpened: opened })} onClick={opened ? close : open}>
                <span className={classes.selectToggleContent}>Мои курсы</span>
                <span className={classes.selectToggleIcon}><SelectToggleIcon/></span>
              </div>
            )}
          />
          <div className={cx({ navLogin: true, navItem: true })}>
            {user ?
              (<Link to={URLSections.My.Profile.index}>{t('login.profile')}</Link>)
              : (<div onClick={handleLogin}>{t('login.signIn')}</div>)
            }
          </div>
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
              to={URLSections.My.Profile.index}
              onClick={() => setIsOpened(false)}
            >
              {t('login.profile')}
            </Link>
          ) : (
            <div
              className={classes.loginBtn + ' s-text-24'}
              onClick={handleLogin}
            >
              {t('login.signIn')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function handleLogin() {
  store.dispatch(login({ payload: {}}));
}
