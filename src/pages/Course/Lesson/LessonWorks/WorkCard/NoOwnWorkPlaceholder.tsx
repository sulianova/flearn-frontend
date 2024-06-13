import classNames from 'classnames/bind';

import User from 'assets/images/Svg/User';
import Image from 'assets/images/Svg/Image';
import { formatI18nT } from 'shared';

import classes from './WorkCard.module.scss';

import { IUserData } from 'services/user.service';

const cx = classNames.bind(classes);
const t = formatI18nT('courseLesson.works');

export default NoOwnWorkPlaceholder;

interface IProps {
  authedUser: IUserData | null
}

function NoOwnWorkPlaceholder(props: IProps) {
  return (
    <div className={cx({ _: true, hidden: false })}>
      <div className={classes.emptyPreview}>
        <Image/>
        <div className={classes.emptyPreviewDescription}>{t('emptyPreviewDescription')}</div>
      </div>
        <div className={classes.overlay}/>
      <div className={classes.user}>
        <div className={classes.userImage}>
          <User/>
        </div>
        <div className={classes.userName}>{props.authedUser?.displayName}</div>
      </div>
    </div>
  );
}
