import classes from './Profile.module.scss';
import classesCourseCard from './CourseCard.module.scss';
import { DrawFreeCard } from 'assets/images';

export default function Profile() {
  return (
    <div className="Profile"> 
      <div className={classes.courseGroup}>
        <div className={classes.courseGroupTitle + " s-text-21-uppercase"}>ваши курсы</div>
        <div className={classesCourseCard.item}>
          <div className={classesCourseCard.info}>
            <a className={classesCourseCard.titleLink + " s-text-21-uppercase"} href="course.html" target="_blank"><span className="inline-link-text">Как рисовать свободно</span></a>
            <div className={classesCourseCard.cover}><img src={DrawFreeCard} alt="" decoding="async"/></div>
            <div className={classesCourseCard.date + " s-text-21-uppercase"} ><span>доступ до 5 мая 2023 года</span><a href="#"><span className="inline-link-text">продлить</span><span className="inline-link-arrow">→</span></a></div>
          </div>
        </div>
        <div className={classesCourseCard.item}>
          <div className={classesCourseCard.info}>
            <a className={classesCourseCard.titleLink + " s-text-21-uppercase"} href="lessons.html" target="_blank"><span className="inline-link-text">Как рисовать свободно</span></a>
            <div className={classesCourseCard.cover}><img src={DrawFreeCard} alt="" decoding="async"/></div>
            <div className={classesCourseCard.date + " s-text-21-uppercase"}><span>доступ до 5 мая 2023 года</span><a href="#"><span className="inline-link-text">продлить</span><span className="inline-link-arrow">→</span></a></div>
          </div>
        </div>
      </div>
    </div>
  );
}
