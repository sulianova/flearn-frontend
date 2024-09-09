
import { useMemo } from 'react';

import { courseService } from 'services/course.service';

import Spinner from 'ui/Spinner/Spinner';

import classes from './Catalogue.module.scss'
import Card from './Card/Card';

export default function Catalogue() {
  const allRealCourses = courseService.useCourses();
  const courses = useMemo(() => {
    const realCourses = allRealCourses.filter(course => !['illustration', 'how-to-draw-free'].includes(course.id));
    // return [...realCourses.map(c => ({ isDummy: false, ...c })), ...dummyCourses];
    return realCourses.map(c => ({ isDummy: false, ...c }));
  }, [allRealCourses]);

  const isLoading = !allRealCourses.length;
  if (!allRealCourses.length) {
    return (
      <div className={classes.spinnerWrapper}>
        <Spinner variant='global'/>
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      {courses.map(course => <Card key={course.id} course={course}/>)}
    </div>
  );
}
