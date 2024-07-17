import type { ICourseData } from 'services/course.service';
import { i18n } from 'shared';
import { URLSections } from 'router';
import { formatDate } from 'utils';

import Img from 'ui/Img/Img';
import Link from 'ui/Link/Link';
import Icon from 'ui/Icon/Icon';

import classes from './Card.module.scss';

interface IProps {
  course: ICourseData
}

export default function Card({ course }: Readonly<IProps>) {
  return (
    <Link 
      className={classes.__}
      to={URLSections.Course.to({ courseId: course.id })}>
      <div className={classes.content}>
        {/* <div className={classes.cardIcon}><Icon icon='Composition'/></div> */}
        <h3 className={classes.title}>{course.title}</h3>
        <div className={classes.description}>{course.introDescription}</div>
        <div className={classes.info}>
          <div className={classes.infoText}>
            {i18n.t('catalogue.card.info', {
            startDate: formatDate(course.startDate, { timeZone: 'Europe/Moscow' }),
            endDate: formatDate(course.endDate, { timeZone: 'Europe/Moscow' }),
            duration: i18n.t(`duration.${course.duration.unit}`, { count: course.duration.value }),
            })}
          </div>
          <div className={classes.infoText}>
            15 упражнений
          </div>
        </div>
        {/* <div className={classes.cardBtn}><span>Подробнее о курсе</span><span className={classes.icon}><Icon icon='ArrowButton'/></span></div> */}
      </div>
      <div className={classes.background + ' bc-color-promo-highlight-yellow'}>
        {/* <div className={classes.preview}>
          <Img src={course.introImage?.imageSrc ?? ''} alt={course.introImage?.imageAlt ?? ''}/>
        </div> */}
      </div>
    </Link>
  );
}
