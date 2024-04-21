import classNames from 'classnames/bind';

import type { ICourseData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Animated from 'ui/Animated';
import Link from 'ui/Link/Link';
import Text from 'ui/Text/Text';

import classes from './FAQ.module.scss';


export default FAQ;

const t = formatI18nT('courseLanding.faq');
const cx = classNames.bind(classes);

interface IProps {
  faq: NonNullable<ICourseData['faq']>
}

function FAQ({ faq }: IProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h2 className={classes.headerTitle + ' s-text-56'}>{t('headerTitle')}</h2>
        <div className={classes.headerDesc + ' s-text-24'}>
          {t('headerDesc1')}
          <Link to={t('creatorLink')}  target='_blank'>
            <span className='key-link'>{t('headerDesc2')}</span>
          </Link>
          {t('headerDesc3')}
        </div>
      </div>
      <div className={classes.list}>
        {faq.map(({ question, answer }, index) => (
          <Animated.Scroll key={index}>
            {(id, className) => (
              <div className={cx({ item: true }, className)} id={id}>
                <div className={classes.itemQuestion + ' s-text-24'}><Text text={question}/></div>
                <div className={classes.itemAnswer + ' s-text-18'}><Text text={answer}/></div>
              </div>
            )}
          </Animated.Scroll>
        ))}
      </div>
    </div>
  );
}