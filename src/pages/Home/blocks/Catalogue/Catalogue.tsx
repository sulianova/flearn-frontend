import { useMemo } from 'react';

import { courseService, dummyCourses } from 'services/course.service';

import CourseCard from 'components/CourseCard/CourseCard';
import Spinner from 'ui/Spinner/Spinner';

import classes from './Catalogue.module.scss';

interface IProps {
  linkToFreeCourse: string
  onNotAuthedClick: () => void
}

export default function Catalogue(props: IProps) {
  const allRealCourses = courseService.useCourses();
  const courses = useMemo(() => {
    const realCourses = allRealCourses.filter(course => !['illustration', 'how-to-draw-free'].includes(course.id));
    return [...realCourses.map(c => ({ isDummy: false, ...c })), ...dummyCourses];
  }, [allRealCourses]);

  if (!courses.length) {
    return (
      <div className={classes.spinnerWrapper}>
        <Spinner variant='global'/>
      </div>
    );
  }

  return (
    <>
      <div data-bcalternate/>
      <div className={classes.header}>
        <h2 className={classes.header__title}>Курсы</h2>
        <div className={classes.header__description}>Интерактивные уроки для ежедневной практики. Развивают насмотренность, помогают оставаться в форме.</div>
      </div>
      <div className={classes.animationWrapper}>
        <div className={classes.group}>
          {courses.map(course => <CourseCard.BASE key={course.id} course={course}/>)}
          {courses.map(course => <CourseCard.BASE key={course.id} course={course}/>)}
          {courses.map(course => <CourseCard.BASE key={course.id} course={course}/>)}
          {courses.map(course => <CourseCard.BASE key={course.id} course={course}/>)}
        </div>
      </div>
    </>
  );
}
