import classNames from 'classnames/bind';

import { formatI18nT } from 'shared';
import { IUserData } from 'services/user.service';

import Icon from 'ui/Icon/Icon';

import classes from './WorkCard.module.scss';

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
        <Icon icon='Image'/>
        <div className={classes.emptyPreviewDescription}>{t('emptyPreviewDescription')}</div>
      </div>
        <div className={classes.overlay}/>
      <div className={classes.user}>
        <div className={classes.userImage}>
          <Icon icon='User'/>
        </div>
        <div className={classes.userName}>{props.authedUser?.displayName}</div>
      </div>
    </div>
  );
}
