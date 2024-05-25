import { useEffect, useState } from 'react';

import { ICourseData, courseService } from 'services/course.service';

import Card from './Card/Card';

import classes from './Catalogue.module.scss';

export default function Catalogue() {
  const [courses, setCourses] = useState<ICourseData[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    const s = courseService.getCourseBS()
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
      <div className={classes.header}>
        <div className={classes.headerTitle + ' s-text-56'}>Курсы по иллюстрации</div>
        <div className={classes.description + ' s-text-21'}> Познакомимся с иллюстрацией, потренируемся в цифровом и обычном рисовании.</div>
      </div>
      <div className={classes.wrapper}>
        {courses.map(course => <Card key={course.id} course={course}/>)}
      </div>
    </>
  );
}
