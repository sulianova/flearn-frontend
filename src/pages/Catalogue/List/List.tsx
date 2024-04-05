import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { ICourseData, courseService } from 'services/course.service';

import Card from '../Card/Card';

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

  return (
  <div className={classes.wrapper}>
      <Card></Card>
      <Card></Card>
      <Card></Card>
  </div>
  );
}

// function renderCards(props:  ) {
//   return props.map((d, index) => (<Card key={index} {...d}/>));
// }