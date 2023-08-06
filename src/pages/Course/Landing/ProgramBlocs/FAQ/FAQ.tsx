import { Fragment } from 'react';
import { formatI18nT } from 'shared';
import classes from './FAQ.module.scss';

import type { ICourseData } from 'types';
import Text from 'ui/Text/Text';

export default FAQ;

const t = formatI18nT('courseLanding.faq');

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
          <a className='key-link'>{t('headerDesc2')}</a>
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
    <div className={classes.item}>
    <div className={classes.itemQuestion + ' s-text-24'}><Text text={props.question}/></div>
    <div className={classes.itemAnswer + ' s-text-18'}><Text text={props.answer}/></div>
  </div>
  );
}

function renderItems(props: ICourseData['faq'] ) {
  return props.map((d, index) => (<Fragment key={index}>{renderItem(d)}</Fragment>));
}
