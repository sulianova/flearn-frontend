import { useState } from 'react';
import classnames from 'classnames/bind';

import type { ICourseCardInfo } from 'services/course.service';
import { emailService } from 'services/email.service';
import { userService } from 'services/user.service';
import { i18n } from 'shared';
import { URLSections } from 'router';

import Link from 'ui/Link/Link';
import Icon from 'ui/Icon/Icon';

import classes from './CourseCardExtended.module.scss';
const cx = classnames.bind(classes);

interface IProps {
  course: ICourseCardInfo
  isHorizontal?: boolean
}

export default function CourseCardExtended({ course, isHorizontal }: Readonly<IProps>) {
  const [clicked, setClicked] = useState(false);
  const content = (
    <>
      <div className={classes.icon}>
        <div className={classes.course}><Icon {...course.icon}/></div>
        <div className={classes.star_18}> <Icon icon='Pro'/></div>
        <div className={classes.star_12}> <Icon icon='Pro'/></div>
      </div>
      <div className={classes.content}>
        <h3 className={classes.title}>{course.title}</h3>
        <div className={classes.description}>{course.introDescription}</div>
        <div className={classes.meta}>
          <p>{i18n.t(`catalogue.card.info.${course.level}`)}</p>
          <p>{i18n.t(`lesson.p`, { count: course.metaData.lessonsAmount })}</p>
        </div>
      </div>
      <div className={classes.background}></div>
    </>
  );

  if (!course.isDummy) {
    return (
      <Link 
        className={cx({wrapper: true, wrapper_horizontal: isHorizontal})}
        to={URLSections.Course.to({ courseId: course.id })}
      >
        {content}
      </Link>
    );
  }
  return (
    <div className={cx({wrapper: true, wrapper_horizontal: isHorizontal})}
      onClick={() => {
        setClicked(true);
        emailService.sendEmail({
          type: emailService.EEmail.WantToBuyDummyCourse,
          course,
          requester: userService.authedUser ?? undefined,
        })
      }}
    >
      <div className={classes.chips}>скоро</div>
      {content}
      {/* <div className={classes.btn}>
        {
          !course.isDummy ? 'Подробнее'
          : !clicked ? 'Мне интересно'
          : 'Учли!'
        }
      </div> */}
    </div>
  );
}
