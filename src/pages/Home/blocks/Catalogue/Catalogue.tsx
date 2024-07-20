import { authService } from 'services/auth.service';
import { courseService } from 'services/course.service';

import Card from './Card/Card';

import classes from './Catalogue.module.scss';
import Spinner from 'ui/Spinner/Spinner';
import Icon from 'ui/Icon/Icon';
import Link from 'ui/Link/Link';

interface IProps {
  linkToFreeCourse: string
  onNotAuthedClick: () => void
}

export default function Catalogue(props: IProps) {
  const courses = courseService.useCourses()
    .filter(course => !['illustration', 'how-to-draw-free'].includes(course.id))

  if (!courses.length) {
    return (
      <div className={classes.spinnerWrapper}>
        <Spinner variant='global'/>
      </div>
    );
  }

  const promoContent = (
    <>
      <div className={classes.content}>
        <div className={classes.title}>Как это — быть иллюстратором. Бесплатный курс, чтобы попробовать</div>
        <div className={classes.cardBtn}><span className={classes.text}>Начать учиться</span><span className={classes.icon}><Icon icon='ArrowButton'/></span></div>
      </div>
      <div className={classes.background + ' bc-color-promo-highlight-yellow'}></div>
    </>
  );
  return (
    <>
      <div className={classes.header}>
        <h2 className={classes.headerTitle}>Курсы, чтобы начать</h2>
        <div className={classes.headerDesc}>

        </div>
      </div>
      <div className={classes.animationWrapper}>
        <div className={classes.wrapper}>
          {courses.map(course => <Card key={course.id} course={course}/>)}
          {authService.isAuthenticated ? (
            <Link
              className={classes.promo}
              to={props.linkToFreeCourse}
            >
              {promoContent}
            </Link>
          ) : (
            <div
              className={classes.promo}
              onClick={props.onNotAuthedClick}
            >
              {promoContent}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
