import type { ICourseData, ICourseFaqItem } from 'services/course.service';
import { formatI18nT } from 'shared';

import Link from 'ui/Link/Link';

import classes from './FAQ.module.scss';
import Item from './Item/Item';

export default FAQ;

const t = formatI18nT('courseLanding.faq');

interface IProps {
  faq: ICourseFaqItem[]
}

function FAQ({ faq }: IProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.list}>
        {faq.map(({ question, answer }, index) => (
          <Item key={index} faq={{ question, answer }}/>
        ))}
      </div>
      <div className={classes.header}>
        {/* <h2 className={classes.headerTitle}>{t('headerTitle')}</h2> */}
        <div className={classes.headerDesc}>
          {t('headerDesc1')}
          <Link to={t('creatorLink')}  target='_blank'>
            <span className='key-link'>{t('headerDesc2')}</span>
          </Link>
          {t('headerDesc3')}
        </div>
      </div>
    </div>
  );
}