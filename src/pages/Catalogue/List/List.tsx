import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { ICourseData, courseService } from 'services/course.service';

import Card from './Card/Card';

import classes from './List.module.scss';

export default function List() {
  const [courses, setCourses] = useState<ICourseData[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    const s = courseService.getCourseBS()
      .subscribe(o => {
        if (!o || o instanceof Error || cancelled) {
          return;
        }
        setCourses(o.courses);
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
  <div className={classes.wrapper}>
      {courses.map(course => <Card key={course.id} course={course}/>)}
  </div>
  );
}
