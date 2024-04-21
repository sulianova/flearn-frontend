import classNames from 'classnames/bind';
import { Fragment } from 'react';

import type { ICourseData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Animated from 'ui/Animated';
import Image from 'ui/Img/Img';

import classes from './Gallery.module.scss';

export default Gallery;

const cx = classNames.bind(classes);
const t = formatI18nT('courseLanding.teacherGallery');

interface IProps {
  teacherGallery: NonNullable<ICourseData['teacherGallery']>
}

function Gallery({ teacherGallery }: IProps) {
  return (
    <div className={classes.__}>
      <Animated.Scroll>
        {(id, className) => (<h2 className={cx({ title: true }, className) + ' s-text-56'} id={id}>{t('title')}</h2>)}
      </Animated.Scroll>
      <div className={cx({ list: true })}>
        {teacherGallery.map(({ imageSrc, imageAlt }, index) => (
          <div className={cx({ item: true })} key={index}>
            <Image src={imageSrc} alt={imageAlt}/>
          </div>
        ))}
      </div>
    </div>
  );
}
