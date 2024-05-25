import Img from 'ui/Img/Img';

import Sofi from './SofiUlianova25.jpg'
import classes from './Feedback.module.scss'; 

export default function Feedback() {
  return (
    <>
      <div className={classes.header}>
        <div className={classes.headerTitle + ' s-text-56'}>Много практики и обратной связи</div>
      </div>
      <div className={classes.content}>
        <div className={classes.points}>
          <div className={classes.pointsCard}>
            <h3 className={classes.pointsCardTitle + ' s-text-28'}>Поможем справиться со страхом ошибки</h3>
            <div className={' s-text-18'}>Когда работа одна, ее легко испортить. Когда работ 10, среди них можно выбрать. В среднем за неделю студенты успевают закончить 10-20 рисунков.</div>
          </div>
          <div className={classes.pointsCard}>
            <h3 className={classes.pointsCardTitle  + ' s-text-28'}>Направим и поддержим</h3>
            <div className={' s-text-18'}>Преподаватель проверяет домашние задания, проводит вебинары и делится собственным опытом.</div>
          </div>
          <div className={classes.pointsCard}>
            <h3 className={classes.pointsCardTitle + ' s-text-28'}>Доведем до результата</h3>
            <div className={' s-text-18'}>Индивидуальная обратная связь поможет развить навыки, завершить проекты и собрать сильное портфолио.</div>
          </div>
        </div>
        <div className={classes.imageCard}>
          <Img
            src={Sofi}
            alt={'alt'}
          />
        </div>
      </div>
    </>
  );
}
