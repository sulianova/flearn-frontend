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
    <>
      <h2 className={classes.sectionTitle}>Могут вам подойти</h2>
      <div className={classes.wrapper}>
        {courses.map(course => <Card key={course.id} course={course}/>)}
      </div>
    </>
  );
}
