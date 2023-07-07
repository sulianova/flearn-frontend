import classes from './Description.module.scss';
import classesItem from './Item.module.scss';

export default Description;

function Description() {
  return (
    <div className={classes.wrapper}>
      <h2 className={classes['title'] + ' s-text-56'}>Курс подойдeт тем, кто</h2>
      <div className={classes.list}>
        <div className={classesItem._}>
          <div className={classesItem.questionWrapper}>
            <div className={classesItem['question'] + ' s-text-18'}>Не знает с чего начать.</div>
          </div>
          <div className={classesItem['answear'] + ' s-text-28'}>Преподаватель подскажет, какие материалы купить, как держать ручку, ответит на вопросы, поддержит.</div>
        </div>
        <div className={classesItem._}>
          <div className={classesItem.questionWrapper}>
            <div className={classesItem['question'] + ' s-text-18'}>Уверен, что всё зря, если рисунок «не как на фотографии».</div>
          </div>
          <div className={classesItem['answear'] + ' s-text-28'}>Фотографическая точность — одно из возможных средств выразительности. Еще есть контраст, выразительные линии, фактура. На вебинаре будем учиться делать выразительные рисунки, не копируя фотографию.</div>
        </div>
        <div className={classesItem._}>
          <div className={classesItem.questionWrapper}>
            <div className={classesItem['question'] + ' s-text-18'}>Боится, что не получится.</div>
          </div>
          <div className={classesItem['answear'] + ' s-text-28'}>На первых этапах в рисовании мешает не столько отсутствие навыков, сколько предубеждения и страхи: «а если не получится», «не знаю, как правильно». Поэтому в начале важна поддержка и дружелюбная атмосфера. На вебинаре можно все, преподаватель поддержит любые идеи и эксперименты.</div>
        </div>
        <div className={classesItem._}>
          <div className={classesItem.questionWrapper}>
            <div className={classesItem['question'] + ' s-text-18'}>Не знает, как передать то, что хочется.</div>
          </div>
          <div className={classesItem['answear'] + ' s-text-28'}>Преподаватель лично общается с учениками, обсуждает с ними рисунки. Помогает понять, что пошло не так. Подсказывает, что сделать, чтобы получилось. </div>
        </div>
      </div>
    </div>
  );
}
