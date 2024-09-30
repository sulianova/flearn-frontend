import { useMemo } from 'react';

import { courseService, dummyCourses } from 'services/course.service';

import CourseCard from 'components/CourseCard/CourseCard';
import Spinner from 'ui/Spinner/Spinner';

import classes from './Catalogue.module.scss';

export default function Catalogue() {
  const userCourses = courseService.useUserCourses();
  const allCourses = courseService.useCourses();
  const courses = useMemo(() => {
    const excludeIds = ['illustration', 'how-to-draw-free', ...(userCourses ?? []).map(c => c.id)];
    return [...allCourses
      .filter(course => !excludeIds.includes(course.id))
      .map(c => ({ isDummy: false, ...c })), ...dummyCourses];
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
      <h2 className={classes.section__title}>Что еще вам может понравиться</h2>
      <div className={classes.list}>
        {courses.map(course => <CourseCard.EXTENDED key={course.id} course={course} isHorizontal={true}/>)}
      </div>
    </>
  );
}
