import { TCourseExplainMedia } from 'services/course.service';
import { formatI18nT } from 'shared';

import Img from 'ui/Img/Img';
import Text from 'ui/Text/Text';

import classes from './StudyProcess.module.scss';

export default StudyProcess;

interface IProps {
  explainMedia: TCourseExplainMedia
}

const t = formatI18nT('courseLanding.explain');

function StudyProcess() {
  return (
    <>
      <div data-bcalternate></div>
      <div className={classes.header}>
        <div className={classes.header__title}>Как устроено обучение</div>
      </div>
      <div className={classes.list}>
      <div className={classes.item}>
        <h2 className={classes.item__title}>Наглядная теория с онлайн-тренажером</h2>
        <div className={classes.item__description}>Всю информацию и практические задания мы собрали в интерактивном учебнике. Проходить его можно в любое удобное время, с компьютера или с телефона</div>
      </div>
      <div className={classes.item}>
        <h2 className={classes.item__title}>Вопросы по ходу в любое время</h2>
        <div className={classes.item__description}>Вопросы, возникающие по ходу, задаем в любое время в телеграм-чате. В чате можно обсуждать рисование, делиться радостями, горестями, лайфхаками, поддерживать друг друга и болтать.</div>
      </div>
      <div className={classes.item}>
        <h2 className={classes.item__title}>Обратная связь от иллюстратора</h2>
        <div className={classes.item__description}>В конце каждого блока ученики сдают проект, чтобы закрепить пройденное и получить обратную связь от эксперта</div>
      </div>
      </div>
      <div className={classes.group}>
        <div className={classes.cards}>
            <div className={classes.card}>{t('introCardQuote0')}</div>
            <div className={classes.card}>{t('introCardQuote')}</div>
            <div className={classes.card}>{t('videoCardText')}</div>
        </div>
        <div className={classes.image}>
          <div className={classes.image__wrapper}>
            <div className={classes.image__buble}>
              <div>иллюстратор, преподаватель</div>
            </div>
              <Img
                src='https://firebasestorage.googleapis.com/v0/b/flearn-6b617.appspot.com/o/how-to-draw%2Flanding%2Fimages%2FSofiUlianova.jpg?alt=media&token=3ef7a44f-9ade-41ad-8ec2-a4d36555b3c7'
                alt='author'
              />
          </div>
          <div className={classes.image__description}>{t('videoCardText')}</div>
        </div>
      </div>
    </>
  );
}
