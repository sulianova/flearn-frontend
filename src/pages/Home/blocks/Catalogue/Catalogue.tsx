import { useMemo } from 'react';

import { courseService, dummyCourses } from 'services/course.service';
import Spinner from 'ui/Spinner/Spinner';

import Card from './Card/Card';
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
    <div data-bcalternate className={classes.wrapper}>
      <div className={classes.header}>
        <h2 className={classes.header__title}>Курсы</h2>
        <div className={classes.header__desc}>Интерактивные уроки для ежедневной практики. Развивают насмотренность, помогают оставаться в форме.</div>
      </div>
      <div className={classes.animationWrapper}>
        <div className={classes.cardsWrapper}>
          {courses.map(course => <Card key={course.id} course={course}/>)}
        </div>
      </div>
    </div>
  );
}
