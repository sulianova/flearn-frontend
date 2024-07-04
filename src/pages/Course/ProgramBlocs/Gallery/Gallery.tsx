import classNames from 'classnames/bind';
import { useMemo, useState } from 'react';

import type { TImageData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Image from 'ui/Img/Img';
import Icon from 'ui/Icon/Icon';

import classes from './Gallery.module.scss';

export default Gallery;

const cx = classNames.bind(classes);
const t = formatI18nT('courseLanding.teacherGallery');

interface IProps {
  teacherGallery: TImageData[]
}

function Gallery({ teacherGallery }: IProps) {
  const [index, setIndex] = useState(0);
  const shiftedArray = useMemo(() =>
    [...teacherGallery.slice(index), ...teacherGallery.slice(0, index)]
  , [teacherGallery, index]);

  return (
  <>
    <h2 className={cx({ title: true })}>{t('title')}</h2>
    <div className={classes.__}>
      <div
        className={classes.backwardButton}
        onClick={() => setIndex(index - 1 >= 0 ? index - 1 : teacherGallery.length - 1)}
      >
        <Icon icon='ArrowButton'/>
      </div>
      <div className={classes.commonFlowRow}>
        <div className={cx({ list: true })}>
          {shiftedArray.map(({ imageSrc, imageAlt }, index) => (
            <div className={cx({ item: true })} key={index}>
              <Image src={imageSrc} alt={imageAlt}/>
            </div>
          ))}
        </div>
      </div>
      <div
        className={classes.forwardButton}
        onClick={() => setIndex(index + 1 < teacherGallery.length ? index + 1 : 0)}
      >
        <Icon icon='ArrowButton'/>
      </div>
    </div>
  </>
  );
}
