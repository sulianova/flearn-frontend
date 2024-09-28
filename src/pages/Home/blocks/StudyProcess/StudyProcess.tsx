import type { TCourseStudyProcessItem } from 'services/course.service';
import { formatI18nT } from 'shared';

import Img from 'ui/Img/Img';
import Text from 'ui/Text/Text';
import Icon from 'ui/Icon/Icon';

import classes from './StudyProcess.module.scss';

export default StudyProcess;

const t = formatI18nT('courseLanding.studyProcess');

function StudyProcess() {
  return (
    <div data-bcalternate className={classes.wrapper}>
      <div className={classes.header}>
        <h2 className={classes.headerTitle}>Как устроено обучение</h2>
      </div>
      <div className={classes.list}>
      <div className={classes.item}>
        <div className={classes.content}>



          <h2 className={classes.title}>Наглядная теория с онлайн-тренажером</h2>
          <div className={classes.desc}>Всю информацию и практические задания мы собрали в интерактивном учебнике. Проходить его можно в любое удобное время, с компьютера или с телефона</div>
        </div>
      </div>
      <div className={classes.item}>
        <div className={classes.content}>



          <h2 className={classes.title}>Вопросы по ходу в любое время</h2>
          <div className={classes.desc}>
            <p>Вопросы, возникающие по ходу, задаем в любое время в телеграм-чате. В чате можно обсуждать рисование, делиться радостями, горестями, лайфхаками, поддерживать друг друга и болтать.</p>
          </div>
        </div>
      </div>
      <div className={classes.item}>
        <div className={classes.content}>



          <h2 className={classes.title}>Обратная связь от иллюстратора</h2>
          <div className={classes.desc}>В конце каждого блока ученики сдают проект, чтобы закрепить пройденное и получить обратную связь от эксперта</div>
        </div>
      </div>
      </div>
    </div>
  );
}
