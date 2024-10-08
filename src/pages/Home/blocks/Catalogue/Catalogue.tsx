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

  // const promoContent = (
  //   <>
  //     <div className={classes.content}>
  //       <div className={classes.title}>Как это — быть иллюстратором. Бесплатный курс, чтобы попробовать</div>
  //       <div className={classes.cardBtn}><span className={classes.text}>Начать учиться</span><span className={classes.icon}><Icon icon='ArrowButton'/></span></div>
  //     </div>
  //     <div className={classes.background + ' bc-color-promo-highlight-yellow'}></div>
  //   </>
  // );
  return (
    <div className={classes.__}>
      <div className={classes.header}>
        <h2 className={classes.headerTitle}>Курсы</h2>
        <div className={classes.headerDesc}>Интерактивные уроки для ежедневной практики. Развивают насмотренность, помогают оставаться в форме.</div>
      </div>
      <div className={classes.animationWrapper}>
        <div className={classes.wrapper}>
          {courses.map(course => <Card key={course.id} course={course}/>)}
        </div>
      </div>
    </div>
  );
}
