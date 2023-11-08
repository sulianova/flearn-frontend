import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { formatI18nT } from 'shared';
import Image from 'ui/Img/Img';
import classes from './StudentsWorks.module.scss';
import Animated from 'ui/Animated';

import { ICourseData } from 'types';

export default StudentsWorks;

const cx = classNames.bind(classes);
const t = formatI18nT('courseLanding.studentsWorks');

interface IProps {
  data: ICourseData
}

function StudentsWorks(props: IProps) {
  return (
    <div className={classes.__}>
      <Animated.Scroll>
        {(id, className) => (<h2 className={cx({ title: true }, className) + ' s-text-56'} id={id}>{t('title')}</h2>)}
      </Animated.Scroll>
        {renderGallery(props.data.studentsWorks)}
    </div>
  );
}

function renderItem(props: ICourseData['studentsWorks'][number]) {
  return (
    <div className={cx({ item: true })}>
      <Image src={props.imageSrc} alt={props.imageAlt}/>
    </div>
  );
}

function renderGallery(props: ICourseData['studentsWorks']) {
  return (
    <div className={cx({ list: true })}>
      {props.map((d, index) => (<Fragment key={index}>{renderItem(d)}</Fragment>))}
    </div>
  );
}

