import { i18n } from 'shared';
import { URLSections } from 'router';

import { userCourseProgressService } from 'services/userCourseProgress.service';

import Link from 'ui/Link/Link';
import Icon from 'ui/Icon/Icon';

import classes from './Header.module.scss';
import { isIconPNG } from 'services/course.service';
import Img from 'ui/Img/Img';

export default function Header() {
  const lastStudiedCourse = userCourseProgressService.useLastStudiedCourse();

  console.log({ lastStudiedCourse });

  if (!lastStudiedCourse) {
    return (
      <div className={classes.emptyCard}>
         <div className={classes.emptyCard__icon}>
            <Icon
              icon={'CourseImagePlaceholder'}
            />
        </div>
        <div className={classes.content}>
          <div className={classes.content__title}>Когда начнете учиться, курс появится здесь</div>
          <div className={classes.content__description}>Выберите курс, чтобы начать учиться</div>
        </div>
        <div className={classes.actions}>
          <Link
            className={classes.actions__btn}
            to={URLSections.Courses.to()}
          >
            Выбрать курс
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.card}>
        <div className={classes.headerImage}>
          {isIconPNG(lastStudiedCourse.icon.icon) ? (
            <Img
              src={lastStudiedCourse.icon.icon}
              alt={lastStudiedCourse.icon.icon}
            />
          ) : (
            <Icon
              icon={lastStudiedCourse.icon.icon}
              color={lastStudiedCourse.icon.color}
            />
          )}
        </div>
        <div className={classes.content}>
          <div className={classes.content__title}>{lastStudiedCourse.title}</div>
          <div className={classes.content__description}>{lastStudiedCourse.introDescription}</div>
          <div className={classes.meta}>
              {/* <p className={classes.meta__item}>
                {i18n.t(`catalogue.card.info.${lastStudiedCourse.level}`)}
              </p> */}
              <p className={classes.meta_item}>
                {i18n.t(`duration.${lastStudiedCourse.metaData.lessonsDuration.unit}`, { count: lastStudiedCourse.metaData.lessonsDuration.value })}
              </p>
              <p className={classes.meta__item}>
                {i18n.t('lesson.p', { count: lastStudiedCourse.metaData.lessonsAmount })}
              </p>
          </div>
        </div>
      <div className={classes.actions}>
          <Link
            className={classes.currentLessonButton}
            to={URLSections.Course.to({ courseId: lastStudiedCourse.id })}
          >
            Продолжить учиться
          </Link>
          <div className={classes.nextLesson}>
            <div className={classes.nextLesson__subTitle}>Следующий урок</div>
            <div className={classes.nextLesson__title}>Следующий урок</div>
          </div>
      </div>
    </div>
  );
}
