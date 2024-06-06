import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { formatI18nT } from 'shared';

import Store from 'store';
import { fetchCourse, type IFetchCoursePayload } from 'store/actions/sagas';

import { useFetch } from 'hooks';
import Link from 'ui/Link/Link';
import Page, { EPageVariant } from 'ui/Page/Page';

import classes from './My.module.scss';
import classesTitle from './Title.module.scss';
import Profile from './Profile/Profile';
import Settings from './Settings/Settings';

import type { ICourseData } from 'services/course.service';
import { userService, type IUserData } from 'services/user.service';
import { URLSections } from 'types';
import type { IRootState } from 'types';
import { authService } from 'services';

const cx = classNames.bind(classes);
const t = formatI18nT('my');

export default connect(mapStateToProps)(My);

interface IConnectedProps {
  course?: ICourseData
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    course: state.course?.data,
  };
}
interface IProps extends IConnectedProps {
  mode: 'Profile' | 'Settings'
}

function My(props: IProps) {
  const { mode, course } = props;

  const user = userService.useAuthedUser();

  useEffect(() => {
    authService.authenticate();
  }, []);

  useFetch<IFetchCoursePayload>({
    actionCreator: fetchCourse,
    payload: { courseId: 'how-to-draw' },
  })

  if (!user) {
    return (
      <Page variant={EPageVariant.LMS} header footer>
        Failed to authenticate
      </Page>
    );
  }

  if (!course) {
    return (
      <Page variant={EPageVariant.LMS} header footer>
        Loading...
      </Page>
    );
  }

  return (
    <Page variant={EPageVariant.LMS} header footer>
      <div className={classesTitle.wrapper}>
        <h1 className={classesTitle.text + ' s-text-88'}>{user.displayName}</h1>
      </div>
      <div className={classes.menu}>
        <div className={classes.menuLinkWrapper}>
        <Link
            className={cx({ menuLink: true, isActive: mode === 'Profile' }) + ' s-text-21-uppercase'}
            to={URLSections.My.Profile.index}
            aria-current='page'
          >
            {t('profile.title')}
          </Link>
        </div>
        <div className={classes.menuLinkWrapper}>
          <Link
            className={cx({ menuLink: true, isActive: mode === 'Settings' }) + ' s-text-21-uppercase'}
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
