import classes from './Resources.module.scss';

import { formatI18nT, i18n } from 'shared';

import Icon from 'ui/Icon/Icon';
import Link from 'ui/Link/Link';

const t = formatI18nT('footer');

export default function Resources() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.section__title}>Ресурсы</div>
      <div className={classes.list}>
        <Link
          className={classes.item}
            to={t('socialTelegram.link')}
            target='_blank'
        >
          <div className={classes.item__icon}><Icon icon='Telegram'/></div>
          <div className={classes.item__text}>Телеграм сообщество</div>
        </Link>
      </div>
    </div>
  )
}