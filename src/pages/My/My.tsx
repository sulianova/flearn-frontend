import Page from 'ui/Page/Page';
import classes from './My.module.scss';
import classesTitle from './Title.module.scss';
import classNames from 'classnames/bind'

import Profile from './Profile/Profile';
import Settings from './Settings/Settings';

export default My;

interface IProps {
  mode: 'Profile' | 'Settings'
}

function My(props: IProps) {
  const { mode } = props;
  const cx = classNames.bind(classes);

  return (
    <Page header footer wrapper='My'>
      <div className={classesTitle.wrapper}> 
        <h1 className={classesTitle.text}>София Ульянова</h1>
      </div>
      <div className={classes.menu}>
        <div className={classes.menuLinkWrapper}><a className={cx({ menuLink: true, isActive: true }) + " s-text-20-uppercase"} href="#" aria-current="page">Профиль</a></div>
        <div className={classes.menuLinkWrapper}><a className={cx({ menuLink: true, isActive: false }) + " s-text-20-uppercase"}  href="#" aria-current="page">Настройки</a></div>
      </div>
      {mode === 'Profile' ? <Profile/> : <Settings/>}
    </Page>
  );
}
