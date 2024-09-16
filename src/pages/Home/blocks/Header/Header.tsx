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
    <div className={classes.__}>
      <div className={classes.inner}>
        <div className={classes.headerWrapper}>
          <h1 className={classes.headerTitle}>
            <span>Учите иллюстрацию бесплатно, весело и эффективно!</span>
          </h1>
          <div className={classes.descriptionWrapper }>
            <div className={classes.description}>{i18n.t('catalogue.description')}</div>
          </div>
        </div>
          <div className={classes.actions}>
            {authService.isAuthenticated ? (
              <Link
                className={classes.actionsBtn}
                to={URLSections.EmptyProfile.to()}
              >
                <div className={classes.text}>Начать учиться</div>
              </Link>
            ) : (
              <div
                className={classes.actionsBtn}
                onClick={props.onNotAuthedClick}
              >
                <div className={classes.text}>Начать учиться</div>
              </div>
            )}
          </div>
      </div>
      <div className={classes.imgWrapper}>
      <iframe src="https://lottie.host/embed/be172876-488a-4dce-9519-adecb7fe084d/A5JsQIWR3m.json"></iframe>
      </div>
    </div>
  );
}
