import { FromTheWarmLights1, FromTheWarmLights2, SummerTime, TheStrangerVisitingNatureSusl, TheStrangerVisitingNatureTiger  } from 'assets/images';
import classNames from 'classnames/bind';
import LocomotiveScroll from 'locomotive-scroll';
import { Fragment, useEffect, useRef } from 'react';
import Image from 'ui/Img/Img';
import classes from './Gallery.module.scss';
import { formatI18nT } from 'shared';

import { ICourseData } from 'types';

export default Gallery;

const cx = classNames.bind(classes);
const t = formatI18nT('courseLanding.teacherGallery');

interface IProps {
  data: ICourseData
}

function Gallery(props: IProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (galleryRef.current) {
      const scroll = new LocomotiveScroll({
        el: galleryRef.current,
        direction: 'horizontal',
        smooth: true,
        lerp: 0.05,
        smartphone: {
            smooth: true,
        },
      });
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title + ' s-text-56'}>{t('title')}</h2>
        {renderScrollGallery(props.data.teacherGallery, galleryRef)}
    </div>
  );
}

function renderScrollSlide(props: ICourseData['teacherGallery'][number]) {
  return (
    <div
      className={cx({ item: true, scrollSlide: true })}
      data-scroll
      data-scroll-speed='2'
    >
      <Image src={props.imageSrc} alt={props.imageAlt}/>
    </div>
  );
}

function renderScrollGallery(props: ICourseData['teacherGallery'], ref: React.RefObject<HTMLDivElement>) {
  return (
    <div className={cx({ container: true, scrollContainer: true })} data-scroll-container ref={ref}>
      <div className={cx({ wrapper: true, scrollWrapper: true})} data-scroll-section>
        {props.map((d, index) => (<Fragment key={index}>{renderScrollSlide(d)}</Fragment>))}
      </div>
    </div>
  );
}
