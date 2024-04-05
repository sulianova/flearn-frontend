import type { ICourseData } from 'services/course.service';
import { i18n } from 'shared';
import { URLSections } from 'types';
import { formatDate } from 'utils';

import Img from 'ui/Img/Img';
import Link from 'ui/Link/Link';

import classes from './Card.module.scss';

interface IProps {
  course: ICourseData
}

export default function Card({ course }: Readonly<IProps>) {
  return (
    <div className={classes.__}>
      <div className={classes.preview}>
        <Link
          className={classes.previewLink}
          to={URLSections.Course.to({ courseId: course.id })}
        />
        <Img src={course.cardImage?.imageSrc ?? ''} alt={course.cardImage?.imageAlt ?? ''}/>
      </div>
      <div className={classes.content}>
        <Link
          className={classes.title + ' s-text-36'}
          to={URLSections.Course.to({ courseId: course.id })}
        >
          {course.title}
        </Link>
        <div className={classes.info}>
          <div className={classes.infoDate + ' s-text-21'}>
            {i18n.t('catalogue.card.info', {
              startDate: formatDate(course.startDate, { timeZone: 'Europe/Moscow' }),
              endDate: formatDate(course.endDate, { timeZone: 'Europe/Moscow' }),
              duration: i18n.t(`duration.${course.duration.unit}`, { count: course.duration.value }),
            })}
          </div>
        </div>
        <div className={classes.description + ' s-text-18'}>{course.introDescription}</div>
        <div className={classes.tags}>
          <span className={classes.hashTag}>#</span>
          {course.tags?.map(tag => (<span key={tag} className={classes.tag + ' s-text-16'}>{tag}</span>))}
        </div>
      </div>
    </div>
  );
}
