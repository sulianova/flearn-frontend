import { useMemo } from 'react';

import { courseService } from 'services/course.service';
import Spinner from 'ui/Spinner/Spinner';

import Card from './Card/Card';
import classes from './Catalogue.module.scss';

interface IProps {
  linkToFreeCourse: string
  onNotAuthedClick: () => void
}

export default function Catalogue(props: IProps) {
  const userCourses = courseService.useUserCourses();
  const allCourses = courseService.useCourses();
  const courses = useMemo(() => {
    const excludeIds = ['illustration', 'how-to-draw-free', ...(userCourses ?? []).map(c => c.id)];
    return allCourses
      .filter(course => !excludeIds.includes(course.id))
      .map(c => ({ isDummy: false, ...c }));
  }, [allCourses, userCourses]);

  if (!userCourses || !allCourses.length) {
    return (
      <div className={classes.spinnerWrapper}>
        <Spinner variant='global'/>
      </div>
    );
  }

  if (!courses.length) {
    return null;
  }

  return (
    <>
      <h2 className={classes.sectionTitle}>Что еще вам может понравиться</h2>
      <div className={classes.wrapper}>
        {courses.map(course => <Card key={course.id} course={course}/>)}
      </div>
    </>
  );
}
