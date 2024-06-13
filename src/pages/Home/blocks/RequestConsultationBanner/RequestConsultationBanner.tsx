import classes from './RequestConsultationBanner.module.scss';
import Link from 'ui/Link/Link';
import { formatI18nT } from 'shared';

const t = formatI18nT('courseLanding.faq');

export default function RequestConsultationBanner() {
  return (
    <div className={classes.__}>
      <div className={classes.content}>
        <h3 className={classes.contentTitle}>Готовы ответить на любые вопросы — спрашивайте</h3>
        <div className={classes.contentDescription}>Подберем подходящий курс или спланируем индивидуальные занятия</div>
        <div className={classes.buttons}>
          <Link 
            className={classes.button + ' s-text-21'}
            to={t('creatorLink')}  target='_blank'
            >
            написать в Telegram
          </Link>
          </div>
      </div>

    </div>
  );
}