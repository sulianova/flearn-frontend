import type { ICourseFeedback } from 'services/course.service';

import Text from 'ui/Text/Text';

import Icon from 'ui/Icon/Icon';
import classNames from 'classnames/bind';
import classes from './Item.module.scss';

const cx = classNames.bind(classes);

interface IProps {
  feedback: ICourseFeedback
}

export default function Item() {
  return (
        <div className={cx({ item: true })}>
          <div className={classes.ratingStars}>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
          </div>
          <div className={classes.feedbackQuote}>
            <p>Всё, что было обещано — было в курсе: поддержка преподавателя, обратная связь по домашнему заданию буквально на каждый рисунок, помощь с любым творческим вопросом, сомнениями, сильная мотивация и опора. Понравилось, что курс с момента открытия подробный: есть цитаты и изображения, которые прикладываются для удобства. Автор детально изъясняется, а в конце ждёт видео, где показывается процесс рисования котиков с подсказками: как лучше сделать при рисовании своих котиков.</p>
            <div className={classes.feedbackAuthor}>
              <span>Светлана Блок</span>
              декабрь 2023
            </div>
          </div>
        </div>
  );
}
