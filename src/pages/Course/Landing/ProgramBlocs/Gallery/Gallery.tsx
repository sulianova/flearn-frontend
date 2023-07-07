import classes from './Gallery.module.scss';
import { TheStrangerVisitingNatureTiger, TheStrangerVisitingNatureSusl, FromTheWarmLights1, FromTheWarmLights2, SummerTime  } from 'assets/images';
import classNames from 'classnames/bind'

export default Gallery;

const cx = classNames.bind(classes);

function Gallery() {
  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title + ' s-text-56'}> Рисунки преподавателя</h2>
      <div className={cx({ container: true, swiperContainer: true })}>
        <div className={cx({ wrapper: true, swiperWrapper: true })}>
          <div className={cx({ item: true, swiperSlide: true })}><img src={ SummerTime } loading="lazy" decoding="async" alt="SummerTime"/></div>
          <div className={cx({ item: true, swiperSlide: true })}><img src={ TheStrangerVisitingNatureTiger } loading="lazy" decoding="async" alt="TheStrangerVisitingNatureTiger"/></div>
          <div className={cx({ item: true, swiperSlide: true })}><img src={ TheStrangerVisitingNatureSusl } loading="lazy" decoding="async" alt="TheStrangerVisitingNatureSusl"/></div>
          <div className={cx({ item: true, swiperSlide: true })}><img src={ FromTheWarmLights1 } loading="lazy" decoding="async" alt="FromTheWarmLights1"/></div>
          <div className={cx({ item: true, swiperSlide: true })}><img src={ FromTheWarmLights2 } loading="lazy" decoding="async" alt="FromTheWarmLights2"/></div>
        </div>
      </div>
    </div>
  )
}
