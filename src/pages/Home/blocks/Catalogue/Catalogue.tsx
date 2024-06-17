import { useEffect, useState } from 'react';

import { ICourseData, courseService } from 'services/course.service';

import Card from './Card/Card';

import classes from './Catalogue.module.scss';

export default function Catalogue() {
  const [courses, setCourses] = useState<ICourseData[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    const s = courseService.getCourseBS({})
      .subscribe(o => {
        if (!o || o instanceof Error || cancelled) {
          return;
        }
        setCourses(o.courses.filter(course => !['illustration', 'how-to-draw-free'].includes(course.id)));
      });
    return () => {
      s.unsubscribe();
      cancelled = true;
    };
  }, []);

  if (!courses) {
    return null;
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
