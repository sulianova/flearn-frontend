import type { ICourseCardInfo } from 'services/course.service';
import { i18n } from 'shared';
import { URLSections } from 'router';
import { formatDate } from 'utils';

import Img from 'ui/Img/Img';
import Link from 'ui/Link/Link';
import Icon from 'ui/Icon/Icon';

import classes from './Card.module.scss';
import { useState } from 'react';
import { emailService } from 'services/email.service';

interface IProps {
  course: ICourseCardInfo
}

export default function Card({ course }: Readonly<IProps>) {
  const [clicked, setClicked] = useState(false);
  const content = (
    <div className={classes.content}>
      <div className={classes.cardIcon}>
        <Icon {...course.icon}/>
      </div>
      <div className={classes.info}>
        <h3 className={classes.title}>{course.title}</h3>
        <div className={classes.description}>{course.introDescription}</div>
        <div className={classes.infoText}>
          <p>
            {i18n.t(`catalogue.card.info.${course.level}`)}
          </p>
          <p>
            15 упражнений
          </p>
        </div>
      </div>
      <div className={classes.cardBtn}>
        {
          !course.isDummy ? 'Подробнее'
          : !clicked ? 'Мне интересно'
          : 'Учли!'
        }
      </div>
    </div>
  );

  if (!course.isDummy) {
    return (
      <Link 
        className={classes.__}
        to={URLSections.Course.to({ courseId: course.id })}
      >
        {content}
        <div className={classes.background}/>
      </Link>
    );
  }
  return (
    <div 
      className={classes.__}
      onClick={() => {
        setClicked(true);
        emailService.sendEmail({
          type: emailService.EEmail.WantToBuyDummyCourse,
          course,
        })
      }}
    >
      {content}
      <div className={classes.background}/>
    </div>
  );
}
