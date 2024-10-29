import { useMemo } from 'react';

import { courseService, dummyCourses } from 'services/course.service';

import CourseCard from 'components/CourseCard/CourseCard';
import Spinner from 'ui/Spinner/Spinner';
import { formatI18nT, i18n } from 'shared';

import classes from './Catalogue.module.scss';

interface IProps {
  linkToFreeCourse: string
  onNotAuthedClick: () => void
}

const t = formatI18nT('catalogue');

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
      <div data-bcred/>
      <div className={classes.header}>
        <h2 className={classes.header__title}>{t('title')}</h2>
        <div className={classes.header__description}>{t('description')}</div>
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
