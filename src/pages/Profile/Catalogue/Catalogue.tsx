import { useMemo } from 'react';

import { courseService, dummyCourses } from 'services/course.service';

import CourseCard from 'components/CourseCard/CourseCard';
import Spinner from 'ui/Spinner/Spinner';
import Icon from 'ui/Icon/Icon';

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
    <div className={classes.catalogueWrapper}>
      <div className={classes.section__title}>Все курсы</div>
      {/* <div className={classes.btnGroup}>
        <div className={classes.btn}>
          <Icon icon='ChevronLeft'/>
        </div>
        <div className={classes.btn}>
          <Icon icon='ChevronRight'/>
        </div>
      </div> */}
      <div className={classes.group}>
        {courses.map(course => <CourseCard.EXTENDED key={course.id} course={course} isHorizontal={false}/>)}
        {/* {courses.map(course => <CourseCard.EXTENDED key={course.id} course={course} isHorizontal={false}/>)} */}
      </div>
    </div>
  );
}
