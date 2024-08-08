import classes from './RequestConsultationBanner.module.scss';
import Link from 'ui/Link/Link';
import { formatI18nT } from 'shared';

const t = formatI18nT('courseLanding.faq');

export default function RequestConsultationBanner() {
  return (
    <div className={classes.__}>
      <div className={classes.content}>
        <h3 className={classes.contentTitle}>Готовы ответить на любые вопросы — спрашивайте</h3>
        <div className={classes.buttons}>
          <Link 
            className={classes.button}
            to={t('creatorLink')}  target='_blank'
            >
            Написать в Telegram
          </Link>
        </div>
      </div>

    </div>
  );
}