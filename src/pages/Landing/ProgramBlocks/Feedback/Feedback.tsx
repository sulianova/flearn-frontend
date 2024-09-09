import classes from './Feedback.module.scss'; 

export default function Feedback() {
  
  return (
    <>
      <div className={classes.header}>
        <div className={classes.headerTitle}>Много практики и обратной связи</div>
      </div>
        <div className={classes.points}>
        <div className={classes.pointsCard}>
          <h3 className={classes.pointsCardTitle}>Поможем справиться со страхом ошибки</h3>
          <div className={classes.pointsCardText + ' s-text-21'}>Когда работа одна, ее легко испортить. Когда работ 10, среди них можно выбрать. В среднем за неделю студенты успевают закончить 10-20 рисунков.</div>
        </div>
        <div className={classes.pointsCard}>
          <h3 className={classes.pointsCardTitle}>Направим и поддержим</h3>
          <div className={classes.pointsCardText + ' s-text-21'}>Преподаватель проверяет домашние задания, отвечает на вопросы и делится собственным опытом.</div>
        </div>
        <div className={classes.pointsCard}>
          <h3 className={classes.pointsCardTitle}>Доведем до результата</h3>
          <div className={classes.pointsCardText + ' s-text-21'}>Индивидуальная обратная связь поможет развить навыки, завершить проекты и собрать сильное портфолио.</div>
        </div>
      </div>
    </>
  );
}
