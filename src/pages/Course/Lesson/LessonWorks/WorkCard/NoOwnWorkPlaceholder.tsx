import classNames from 'classnames/bind';

import UserImage from 'assets/images/Svg/UserImage';
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
      <div className={classes.preview}>
        <div className={classes.emptyPreview}>
          <Image/>
          <div className={classes.emptyPreviewDescription + ' s-text-14'}>{t('emptyPreviewDescription')}</div>
        </div>
      <div className={classes.overlay}/>
      </div>
      <div className={classes.user}>
        <div className={classes.userImage}>
          <UserImage/>
        </div>
        <div className={classes.userName + ' s-text-16'}>{props.authedUser?.displayName}</div>
      </div>
    </div>
  );
}
