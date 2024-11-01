import { isIconPNG, type ICourseCardInfo } from 'services/course.service';
import { i18n } from 'shared';
import { URLSections } from 'router';
import { formatDate } from 'utils';

import Img from 'ui/Img/Img';
import Link from 'ui/Link/Link';
import Icon from 'ui/Icon/Icon';

import classes from './CourseCardBase.module.scss';
import { useState } from 'react';
import { emailService } from 'services/email.service';
import { userService } from 'services/user.service';

interface IProps {
  course: ICourseCardInfo
}

export default function CourseCardBase({ course }: Readonly<IProps>) {
  const [clicked, setClicked] = useState(false);
  const content = (
    <>
      <div className={classes.icon}>
        {isIconPNG(course.icon.icon) ? (
          <Img
            src={course.icon.icon}
            alt={course.icon.icon}
          />
        ) : (
          <Icon
            icon={course.icon.icon}
            color={course.icon.color}
          />
        )}
      </div>
      <div className={classes.content}>
        <div className={classes.title}>{course.title}</div>
        <div className={classes.meta}>
          <p>{i18n.t(`catalogue.card.info.${course.level}`)}</p>
          <p>{i18n.t(`lesson.p`, { count: course.metaData.lessonsAmount })}</p>
        </div>
      </div>
      <div className={classes.btn}>
        {
          !course.isDummy ? 'Подробнее'
          : !clicked ? 'Мне интересно'
          : 'Учли!'
        }
      </div>
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
    <div 
      className={classes.wrapper}
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
    </div>
  );
}
