import { i18n } from 'shared';

import { authService } from 'services/auth.service';
import Link from 'ui/Link/Link';
import { formatI18nT } from 'shared';

import classes from './BannerStart.module.scss'; 
const t = formatI18nT('home.bannerStart');

interface IProps {
  linkToFreeCourse: string
  onNotAuthedClick: () => void
}

export default function BannerStart(props: IProps) {
  return (
      <div data-bcalternate className={classes.card}>
        <div className={classes.content}>
          <div className={classes.title}>{t('title')}</div>
          <div className={classes.actions}>
              {authService.isAuthenticated ? (
                <Link
                  className={classes.actions__btn}
                  to={props.linkToFreeCourse}
                >
                  {t('btn')}
                </Link>
              ) : (
                <div
                  className={classes.actions__btn}
                  onClick={props.onNotAuthedClick}
                >
                  <div className={classes.text}>{t('btn')}</div>
                </div>
              )}
          </div>
        </div>
      </div>
  );
}