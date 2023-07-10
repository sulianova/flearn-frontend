import classes from './FAQ.module.scss';

export default FAQ;

function FAQ() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h2 className={classes.headerTitle + ' s-text-56'}>Ответы на вопросы</h2>
        <div className={classes.headerDesc + ' s-text-24'}>
          Если у вас остались вопросы по курсу, вы можете&nbsp;
          <a>оставить заявку</a>
          &nbsp;и я помогу вам разобраться.
        </div>
      </div>
      <div className={classes.list}>
        <div className={classes.item}>
          <div className={classes.itemQuestion + ' s-text-24'}>Как проходит онлайн обучение</div>
          <div className={classes.itemAnswer + ' s-text-18'}>Ответ на вопросы</div>
        </div>
        <div className={classes.item}>
          <div className={classes.itemQuestion + ' s-text-24'}>Сколько времени дается на домашние задания</div>
          <div className={classes.itemAnswer + ' s-text-18'}>Ответ на вопросы</div>
        </div>
        <div className={classes.item}>
          <div className={classes.itemQuestion + ' s-text-24'}>Какие материалы нужны для курса</div>
          <div className={classes.itemAnswer + ' s-text-18'}>Ответ на вопросы</div>
        </div>
        <div className={classes.item}>
          <div className={classes.itemQuestion + ' s-text-24'}>Подойдет ли мне курс, если я раньше не рисовал</div>
          <div className={classes.itemAnswer + ' s-text-18'}>Ответ на вопросы</div>
        </div>
        <div className={classes.item}>
          <div className={classes.itemQuestion + ' s-text-24'}>Что будет, если я пропустил вебинар</div>
          <div className={classes.itemAnswer + ' s-text-18'}>Ответ на вопросы</div>
        </div>
      </div>
    </div>
  );
}
