import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { formatI18nT } from 'shared';

import Store from 'store';
import { fetchCourse, type IFetchCoursePayload, login } from 'store/actions/sagas';

import { useFetch } from 'hooks';
import Link from 'ui/Link/Link';
import Page from 'ui/Page/Page';

import classes from './My.module.scss';
import classesTitle from './Title.module.scss';
import Profile from './Profile/Profile';
import Settings from './Settings/Settings';

import { URLSections } from 'types';
import type { IRootState, IUserData, ICourseData } from 'types';

const cx = classNames.bind(classes);
const t = formatI18nT('my');

export default connect(mapStateToProps)(My);

interface IConnectedProps {
  user?: IUserData
  course?: ICourseData
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    user: state.user?.user,
    course: state.course?.data,
  };
}
interface IProps extends IConnectedProps {
  mode: 'Profile' | 'Settings'
}

function My(props: IProps) {
  const { mode, user, course } = props;

  useEffect(() => {
    Store.dispatch(login({ payload: {} }));
  }, []);

  useFetch<IFetchCoursePayload>({
    actionCreator: fetchCourse,
    payload: { courseId: 'how-to-draw' },
  })

  if (!user) {
    return (
      <Page header footer wrapper='My'>
        Failed to authenticate
      </Page>
    );
  }

  if (!course) {
    return (
      <Page header footer wrapper='My'>
        Loading...
      </Page>
    );
  }

  return (
    <Page header footer wrapper='My'>
      <div className={classesTitle.wrapper}>
        <h1 className={classesTitle.text + ' s-text-88'}>{user.displayName}</h1>
      </div>
      <div className={classes.menu}>
        <div className={classes.menuLinkWrapper}>
        <Link
            className={cx({ menuLink: true, isActive: mode === 'Profile' }) + ' s-text-20-uppercase'}
            to={URLSections.My.Profile.index}
            aria-current='page'
          >
            {t('profile.title')}
          </Link>
        </div>
        <div className={classes.menuLinkWrapper}>
          <Link
            className={cx({ menuLink: true, isActive: mode === 'Settings' }) + ' s-text-20-uppercase'}
            to={URLSections.My.Settings.index}
            aria-current='page'
          >
            {t('settings.title')}
          </Link>
        </div>
      </div>
      {mode === 'Profile' ? <Profile user={user} data={course}/> : <Settings user={user}/>}
    </Page>
  );
}
