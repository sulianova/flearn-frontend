import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { formatI18nT } from 'shared';
import Image from 'ui/Img/Img';
import classes from './Teachers.module.scss';

import { ICourseData } from 'services/course.service';
import Text from 'ui/Text/Text';

interface IProps {
  data: ICourseData
}

export default Teachers;

const cx = classNames.bind(classes);
const t = formatI18nT('courseLanding.teachers');

function Teachers(props: IProps) {
  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title + ' s-text-56'}>{t('title')}</h2>
      {renderItems(props.data.teachers)}
    </div>
  );
}

function renderItem(props: ICourseData['teachers'][number]) {
  return (
    <div className={classes.item}>
      <div className={classes.card}>
        <div className={classes.cardTitle + ' s-text-36'}><Text text={props.title}/></div>
        <div className={classes.cardDesc + ' s-text-24'}><Text text={props.description}/></div>
      </div>
      <div className={cx({ card: true, cardMedia: true })}><Image src={props.imageSrc} alt={props.imageAlt}/></div>
    </div>
  );
}

function renderItems(props: ICourseData['teachers']) {
  return props.map((d, index) => (<Fragment key={index}>{renderItem(d)}</Fragment>));
}
