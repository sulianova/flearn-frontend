import { i18n } from 'shared';

import { authService } from 'services/auth.service';
import Link from 'ui/Link/Link';

import classes from './IntroBanner.module.scss'; 

interface IProps {
  onNotAuthedClick: () => void
}

export default function IntroBanner(props: IProps) {
  return (
    <div data-bcalternate className={classes.wrapper}>
      <div className={classes.card}>
        <div className={classes.title}>Интерактивные курсы по&#160;иллюстрации</div>
        <div className={classes.desc}>Короткие уроки для ежедневной практики. Развивают насмотренность, помогают оставаться в форме.</div>
        <div className={classes.actions}>
              <div
                className={classes.actionsBtn}
                onClick={props.onNotAuthedClick}
              >
                <div className={classes.text}>{i18n.t('signUp')}</div>
              </div>
          </div>
      </div>
    </div>
  );
}