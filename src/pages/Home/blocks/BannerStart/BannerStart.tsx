import { i18n } from 'shared';

import { authService } from 'services/auth.service';
import Link from 'ui/Link/Link';

import classes from './BannerStart.module.scss'; 

interface IProps {
  linkToFreeCourse: string
  onNotAuthedClick: () => void
}

export default function BannerStart(props: IProps) {
  return (
      <div data-bannerstart className={classes.card}>
        <span className={classes.title}>Развивайте насмотренность, тренируясь по 5&#160;минут в&#160;день</span>
        <div className={classes.actions}>
            {authService.isAuthenticated ? (
              <Link
                className={classes.actionsBtn}
                to={props.linkToFreeCourse}
              >
                {i18n.t('signUp')}
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
  );
}