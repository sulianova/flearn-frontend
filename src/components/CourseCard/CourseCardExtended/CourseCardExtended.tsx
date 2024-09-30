import { useState } from 'react';

import type { ICourseCardInfo } from 'services/course.service';
import { emailService } from 'services/email.service';
import { userService } from 'services/user.service';
import { i18n } from 'shared';
import { URLSections } from 'router';

import Link from 'ui/Link/Link';
import Icon from 'ui/Icon/Icon';

import classes from './CourseCardExtended.module.scss';

interface IProps {
  course: ICourseCardInfo
}

export default function CourseCardExtended({ course }: Readonly<IProps>) {
  const [clicked, setClicked] = useState(false);
  const content = (
    <>
      <div className={classes.icon}>
        <Icon {...course.icon}/>
      </div>
      <h3 className={classes.title}>{course.title}</h3>
      <div className={classes.description}>{course.introDescription}</div>
      <div className={classes.meta}>
        <p>{i18n.t(`catalogue.card.info.${course.level}`)}</p>
        <p>{i18n.t(`lesson.p`, { count: course.metaData.lessonsAmount })}</p>
      </div>
      <div className={classes.background}></div>
    </>
  );

  if (!course.isDummy) {
    return (
      <Link 
        className={classes.wrapper}
        to={URLSections.Course.to({ courseId: course.id })}
      >
        {content}
      </Link>
    );
  }
  return (
    <div className={classes.wrapper}
      onClick={() => {
        setClicked(true);
        emailService.sendEmail({
          type: emailService.EEmail.WantToBuyDummyCourse,
          course,
          requester: userService.authedUser ?? undefined,
        })
      }}
    >
      {content}
      <div className={classes.btn}>
        {
          !course.isDummy ? 'Подробнее'
          : !clicked ? 'Мне интересно'
          : 'Учли!'
        }
      </div>
    </div>
  );
}
