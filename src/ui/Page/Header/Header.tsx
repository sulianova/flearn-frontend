import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';

import type { IUserData } from 'services/user.service';
import { formatI18nT, i18n } from 'shared';
import { IRootState, URLSections } from 'types';

import Link from 'ui/Link/Link';

import classes from './header.module.scss';
import { connect } from 'react-redux';
import store from 'store';
import { login } from 'store/actions/sagas';

const cx = classnames.bind(classes);
const t = formatI18nT('header');

export default connect(mapStateToProps)(Header);

interface IConnectedProps {
  user?: IUserData
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    user: state.user?.user,
  };
}

function Header(props: IConnectedProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const headerClass = cx({ _: true, IsMobileMenuOpened: isOpened });

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflowY = 'hidden';

      return () => {
        document.body.style.overflowY = '';
      };
    }
  }, [isOpened]);

  return (
    <div className={headerClass} data-is-mobile-menu-opened={isOpened}>
      <div className={classes.desc}>
        <div className={classes.logo}>
          <div className={classes.logoWrapper}>
            <Link to={URLSections.Home.index} className='s-text-21'>{i18n.t('logo')}</Link>
          </div>
        </div>
        <div className={classes.nav}>
          {/* <div className={classes.navItem}>
            <Link to={URLSections.My.Profile.index} className='inline-link'>{t('my')}</Link>
          </div> */}
          {/* <div className={classes.navItem}>
            <Link to={URLSections.FreeZone.index} className='inline-link'>{t('freeZone')}</Link>
          </div> */}
          {/* <div className={classes.navItem}>
            <Link to={URLSections.Catalogue.index} className='inline-link'>{t('catalogue')}</Link>
          </div> */}
        </div>
        <div className={classes.navLogin}>
          {props.user ?
            (<Link to={URLSections.My.Profile.index}>{t('login.profile')}</Link>)
            : (<div onClick={handleLogin}>{t('login.signIn')}</div>)
          }
        </div>
        <div className={classes.humburger} onClick={() => setIsOpened(o => !o)}/>
      </div>
      <div className={classes.mob}>
        <div className={classes.mobMenuMain}>
          {/* <div className={classes.mobItem}>
            <Link to={URLSections.My.Profile.index} className='inline-link s-text-36'>
              <span className='inline-text'>{t('my')}</span>
            </Link>
          </div>
          <div className={classes.mobItem}>
            <Link to={URLSections.FreeZone.index} className='inline-link s-text-36'>
              <span className='inline-text'>{t('freeZone')}</span>
            </Link>
          </div>
          */}
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
          {props.user ? (
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
