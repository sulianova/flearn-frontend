import { useEffect } from 'react';
import { connect } from 'react-redux';

import Store from 'store';
import { auth } from 'store/actions/sagas';

import classNames from 'classnames/bind';
import Page from 'ui/Page/Page';
import classes from './My.module.scss';
import classesTitle from './Title.module.scss';

import Profile from './Profile/Profile';
import Settings from './Settings/Settings';
import { IRootState, IUserData } from 'types';

const cx = classNames.bind(classes);

export default connect(mapStateToProps)(My);

interface IConnectedProps {
  user?: IUserData
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    user: state.user?.user,
  };
}
interface IProps extends IConnectedProps {
  mode: 'Profile' | 'Settings'
}

function My(props: IProps) {
  const { mode, user } = props;

  useEffect(() => {
    Store.dispatch(auth({ payload: {} }));
  }, []);

  if (!user) {
    return (
      <Page header footer wrapper='My'>
        Faild to authenticate
      </Page>
    );
  }

  return (
    <Page header footer wrapper='My'>
      <div className={classesTitle.wrapper}>
        <h1 className={classesTitle.text}>{user.displayName}</h1>
      </div>
      <div className={classes.menu}>
        <div className={classes.menuLinkWrapper}>
          <a className={cx({ menuLink: true, isActive: true }) + ' s-text-20-uppercase'} href='#' aria-current='page'>Профиль</a>
        </div>
        <div className={classes.menuLinkWrapper}>
          <a className={cx({ menuLink: true, isActive: false }) + ' s-text-20-uppercase'}  href='#' aria-current='page'>Настройки</a>
        </div>
      </div>
      {mode === 'Profile' ? <Profile user={user}/> : <Settings user={user}/>}
    </Page>
  );
}
