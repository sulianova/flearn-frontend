import { i18n } from 'shared';

import { authService } from 'services/auth.service';
import Link from 'ui/Link/Link';
import Icon from 'ui/Icon/Icon';

import classes from './Header.module.scss';

interface IProps {
  linkToFreeCourse: string
  onNotAuthedClick: () => void
}

export default function Header(props: IProps) {
  return (
    <div className={classes.__}>
      <div className={classes.inner}>
        <div className={classes.headerWrapper}>
          <h1 className={classes.headerTitle}>
            <span >{i18n.t('catalogue.title1')}</span>
          </h1>
          <div className={classes.descriptionWrapper }>
            <div className={classes.description}>{i18n.t('catalogue.description')}</div>
          </div>
        </div>
          <div className={classes.actions}>
            {authService.isAuthenticated ? (
              <Link
                className={classes.actionsBtn}
                to={props.linkToFreeCourse}
              >
                <div className={classes.text}>{i18n.t('signUp')}</div>
              </Link>
            ) : (
              <div
                className={classes.actionsBtn}
                onClick={props.onNotAuthedClick}
              >
                <div className={classes.text}>{i18n.t('signUp')}</div>
              </div>
            )}
          </div>
      </div>
      <div className={classes.imgWrapper}>
        <Icon icon='Chill'/>
      </div>
    </div>
  );
}
