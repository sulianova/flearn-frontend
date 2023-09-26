import { Fragment } from 'react';
import { formatI18nT } from 'shared';
import Animated from 'ui/Animated';
import classes from './FAQ.module.scss';
import Link from 'ui/Link/Link';

import classNames from 'classnames/bind';
import type { ICourseData } from 'types';
import Text from 'ui/Text/Text';

export default FAQ;

const t = formatI18nT('courseLanding.faq');
const cx = classNames.bind(classes);

interface IProps {
  data: ICourseData
}

function FAQ(props: IProps) {
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
            {renderItems(props.data.faq)}
          </div>
        </div>
  );
}

function renderItem(props: ICourseData['faq'][number]) {
  return (
    <Animated.Scroll>
      {(id, className) => (
        <div className={cx({ item: true }, className)} id={id}>
          <div className={classes.itemQuestion + ' s-text-24'}><Text text={props.question}/></div>
          <div className={classes.itemAnswer + ' s-text-18'}><Text text={props.answer}/></div>
        </div>
      )}
    </Animated.Scroll>
  );
}

function renderItems(props: ICourseData['faq'] ) {
  return props.map((d, index) => (<Fragment key={index}>{renderItem(d)}</Fragment>));
}
