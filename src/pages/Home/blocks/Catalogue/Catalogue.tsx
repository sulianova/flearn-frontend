import { useEffect, useState } from 'react';

import { ICourseData, courseService } from 'services/course.service';

import Card from './Card/Card';

import classes from './Catalogue.module.scss';
import Spinner from 'ui/Spinner/Spinner';
import Icon from 'ui/Icon/Icon';

export default function Catalogue() {
  const courses = courseService.useCourses({})
    .filter(course => !['illustration', 'how-to-draw-free'].includes(course.id))

  if (!courses.length) {
    return (
      <div className={classes.spinnerWrapper}>
        <Spinner variant='global'/>
      </div>
    );
  }

  return (
    <>
      <div className={classes.promo}>
        <div className={classes.content}>
          <div className={classes.title}>Как это — быть иллюстратором. Бесплатный курс, чтобы попробовать</div>
          <div className={classes.cardBtn}><span>Подробнее о курсе</span><span className={classes.icon}><Icon icon='ArrowButton'/></span></div>
      </div>
      <div className={classes.background + ' bc-color-promo-highlight-yellow'}>
        </div>
        <div className={classes.background}></div>
      </div>
      <div className={classes.wrapper}>
        {courses.map(course => <Card key={course.id} course={course}/>)}
      </div>
    </>
  );
}
