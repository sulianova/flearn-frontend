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
    <>
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
              «Композиция: как выделить главное»
            </div>
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.ratingStars}>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
          </div>
          <div className={classes.feedbackQuote}>
            <p>Я научилась более системно относиться к проработке иллюстраций. Обычно я рисую бездумно, по вдохновению, и обычно по первому эскизу. Но благодаря курсу я смогла вспомнить о том, как важно словами формулировать идею, рисовать как можно больше эскизов, заранее подбирать референсы. И конечно я поняла, что насмотренность — наше все. Очень классно было рассказано о том как анализировать чужие работы, просто смотреть недостаточно.</p>
            <div className={classes.feedbackAuthor}>
              <span>Анастасия Баранова</span>
              «Как найти стиль»
            </div>
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.ratingStars}>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
          </div>
          <div className={classes.feedbackQuote}>
            <p>Интенсив получился очень интересный, много материала на подумать. Мои представления о серии несколько расширились. Раньше мне казалось, что все работы должны быть чуть ли не одинаковыми, чтоб считаться серией.</p>
            <p>Мне оказалось очень сложно делать много вариантов одного и того же, я на первом же более-менее удачном залипаю и не могу уйти. Пример с кружочком, который по разному изменяется по разным осям, мне очень помог не останавливаться на одном-двух эскизах.</p>
            <div className={classes.feedbackAuthor}>
              <span>Dora Zeev</span>
              «Как найти стиль»
            </div>
          </div>
        </div>
    </>
  );
}
