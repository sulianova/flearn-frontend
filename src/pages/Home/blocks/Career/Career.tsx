import { i18n } from 'shared';

import { authService } from 'services/auth.service';
import Link from 'ui/Link/Link';

import classes from './Career.module.scss'; 

interface IProps {
  linkToFreeCourse: string
  onNotAuthedClick: () => void
}

export default function Career(props: IProps) {
  return (
    <div className={classes.wrappeer}>
      <div className={classes.card}>
        <span className={classes.title}>Улучшайте свои навыки всего за 5 минут в день</span>
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
    </div>
  );
}