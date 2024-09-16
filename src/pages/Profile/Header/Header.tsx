import { i18n } from 'shared';
import { URLSections } from 'router';

import { userCourseProgressService } from 'services/userCourseProgress.service';

import Link from 'ui/Link/Link';
import Icon from 'ui/Icon/Icon';

import classes from './Header.module.scss';

export default function Header() {
  const lastStudiedCourse = userCourseProgressService.useLastStudiedCourse();

  if (!lastStudiedCourse) {
    return (
      <div className={classes.headerWrapper}>
        <div className={classes.headerTitle}>Продолжить обучение</div>
        <div className={classes.header}>У вас пока нет курсов</div>
        <div className={classes.actions}>
          <div className={classes.actionsBtn}>
            <Link
              className={classes.currentLessonButton}
              to={URLSections.Courses.to()}
            >
              Выбрать курс
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.headerWrapper}>
      <div className={classes.headerTitle}>Продолжить обучение</div>
      <div className={classes.header}>
        <div className={classes.headerImage}>
          <Icon {...lastStudiedCourse.icon}/>
        </div>
        <div className={classes.headerContent}>
          <div className={classes.title}>{lastStudiedCourse.title}</div>
          <div className={classes.meta}>
              <p className={classes.metaData_ItemText}>
                {i18n.t(`catalogue.card.info.${lastStudiedCourse.level}`)}
              </p>
              <p className={classes.metaData_ItemText}>
                {i18n.t(`duration.${lastStudiedCourse.metaData.lessonsDuration.unit}`, { count: lastStudiedCourse.metaData.lessonsDuration.value })}
              </p>
              <p className={classes.metaData_ItemText}>
                {i18n.t('lesson.p', { count: lastStudiedCourse.metaData.lessonsAmount })}
              </p>
          </div>
        </div>
      </div>
      <div className={classes.actions}>
        <div className={classes.actionsBtn}>
          <Link
            className={classes.currentLessonButton}
            to={URLSections.Course.to({ courseId: lastStudiedCourse.id })}
          >
            Продолжить учиться
          </Link>
        </div>
      </div>
    </div>
  );
}
