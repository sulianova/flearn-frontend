import type { ICourseData, ICourseFaqItem } from 'services/course.service';
import { formatI18nT } from 'shared';

import Link from 'ui/Link/Link';

import classes from './FAQ.module.scss';
import Item from './Item/Item';

export default FAQ;

const t = formatI18nT('courseLanding.faq');

function FAQ() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>{t('headerTitle')}</div>
      <div className={classes.list}>
          <Item/>
        </div>
        <div className={classes.headerDesc}>
          {t('headerDesc1')}
          <Link to={t('creatorLink')}  target='_blank'>
            <span>{t('headerDesc2')}</span>
          </Link>
          {t('headerDesc3')}
        </div>
    </div>
  );
}