import { URLSections } from 'router';
import { i18n } from 'shared';
import { authService } from 'services/auth.service';

import Link from 'ui/Link/Link';

import classes from './Header.module.scss';

interface IProps {
  onNotAuthedClick: () => void
}

export default function Header(props: IProps) {
  return (
    <div data-header className={classes.header}>
      <div className={classes.inner}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>
            <span>Учите иллюстрацию бесплатно, весело, эффективно!</span>
          </h1>
          <div className={classes.descriptionWrapper }>
            <div className={classes.description}>{i18n.t('catalogue.description')}</div>
          </div>
        </div>
          <div className={classes.actions}>
            {authService.isAuthenticated ? (
              <Link
                className={classes.actions__btn}
                to={URLSections.EmptyProfile.to()}
              >
                Начать учиться
              </Link>
            ) : (
              <div
                className={classes.actions_btn}
                onClick={props.onNotAuthedClick}
              >
                Начать учиться
              </div>
            )}
          </div>
      </div>
      <div className={classes.imgWrapper}>
      <iframe src="https://lottie.host/embed/49f5cea0-eed2-4655-94b6-bcb7fe61b93d/gFmKDudVDa.json"></iframe>
      </div>
    </div>
  );
}
