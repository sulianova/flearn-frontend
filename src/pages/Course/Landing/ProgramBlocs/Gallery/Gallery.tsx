import classNames from 'classnames/bind';

import type { TImageData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Image from 'ui/Img/Img';

import classes from './Gallery.module.scss';

export default Gallery;

const cx = classNames.bind(classes);
const t = formatI18nT('courseLanding.teacherGallery');

interface IProps {
  teacherGallery: TImageData[]
}

function Gallery({ teacherGallery }: IProps) {
  return (
    <div className={classes.__}>
      <h2 className={cx({ title: true })}>{t('title')}</h2>
      <div className={classes.commonFlowRow}>
        <div className={cx({ list: true })}>
          {teacherGallery.map(({ imageSrc, imageAlt }, index) => (
            <div className={cx({ item: true })} key={index}>
              <Image src={imageSrc} alt={imageAlt}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
