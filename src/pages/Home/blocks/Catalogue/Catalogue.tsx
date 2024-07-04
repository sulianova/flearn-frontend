import { useEffect, useState } from 'react';

import { ICourseData, courseService } from 'services/course.service';

import Card from './Card/Card';

import classes from './Catalogue.module.scss';
import Spinner from 'ui/Spinner/Spinner';

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
      {/* <div className={classes.promo}>
        <div className={classes.title}>Как это — быть иллюстратором. Бесплатный курс, чтобы попробовать</div>
        <div className={classes.btnWrapper}>
          <div className={classes.btn}>Сделать первый шаг</div>
        </div>
      </div> */}
      <div className={classes.wrapper}>
        {courses.map(course => <Card key={course.id} course={course}/>)}
      </div>
    </>
  );
}
