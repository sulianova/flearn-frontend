import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { formatI18nT } from 'shared';
import Image from 'ui/Img/Img';
import classes from './Gallery.module.scss';
import Animated from 'ui/Animated';

import { ICourseData } from 'services/course.service';

export default Gallery;

const cx = classNames.bind(classes);
const t = formatI18nT('courseLanding.teacherGallery');

interface IProps {
  data: ICourseData
}

function Gallery(props: IProps) {
  return (
    <div className={classes.__}>
      <Animated.Scroll>
        {(id, className) => (<h2 className={cx({ title: true }, className) + ' s-text-56'} id={id}>{t('title')}</h2>)}
      </Animated.Scroll>
      {renderGallery(props.data.teacherGallery)}
    </div>
  );
}

function renderItem(props: ICourseData['teacherGallery'][number]) {
  return (
    <div className={cx({ item: true })}>
      <Image src={props.imageSrc} alt={props.imageAlt}/>
    </div>
  );
}

function renderGallery(props: ICourseData['teacherGallery']) {
  return (
    <div className={cx({ list: true })}>
      {props.map((d, index) => (<Fragment key={index}>{renderItem(d)}</Fragment>))}
    </div>
  );
}
