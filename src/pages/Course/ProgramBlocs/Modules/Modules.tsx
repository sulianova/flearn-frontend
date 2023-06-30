import classes from './Modules.module.scss';
import { ModulesImages } from 'assets/images';

export default Modules;

function Modules() {
  return (
    <div className={classes.wrapper}> 
      <div className={classes.header}>
        <h2 className={classes['title'] + ' s-text-56'}>Программа</h2>
        <div className={classes['desc'] + ' s-text-24'}>Программа рассчитана на 1 месяц, ей будет нужно посвящать 5-6 часов в неделю.</div>
        <div className={classes.tags}>
          <div className={classes['tag'] + ' s-text-18'}>4 видео-урока</div>
          <div className={classes['tag'] + ' s-text-18'}>14 заданий</div>
          <div className={classes['tag'] + ' s-text-18'}>5 учебных недель</div>
        </div>
      </div>
      <div className={classes.list}> 
        <div className={classes.listItem}>
          <div className={classes.listItemCard}> 
            <div className={classes['listItemMeta'] + ' s-text-16'}><span>Неделя 1</span></div>
            <div className={classes['listItemTitle'] + ' s-text-36'}> Тема первой недели</div>
            <div className={classes['listItemContent'] + ' s-text-18'}>На первых этапах в рисовании мешает не столько отсутствие навыков, сколько предубеждения и страхи: «а если не получится», «не знаю, как правильно». Поэтому в начале важна поддержка и дружелюбная атмосфера. На вебинаре можно все, преподаватель поддержит любые идеи и эксперименты.</div>
          </div>
          <div className={classes.listItemCard}>
            <div className={classes.listItemMedia}><img data-v-desktop-2 alt="Иллюстрация" src={ModulesImages} /></div>
            <div className={classes['listItemMediaDesc'] + ' s-text-18'}>София Ульянова</div>
          </div>
        </div>
        <div className={classes.listItem}>
          <div className={classes.listItemCard}> 
            <div className={classes['listItemMeta'] + ' s-text-16'}><span>Неделя 1</span></div>
            <div className={classes['listItemTitle'] + ' s-text-36'}> Тема первой недели</div>
            <div className={classes['listItemContent'] + ' s-text-18'}><p>На первых этапах в рисовании мешает не столько отсутствие навыков, сколько предубеждения и страхи: «а если не получится», «не знаю, как правильно». Поэтому в начале важна поддержка и дружелюбная атмосфера. На вебинаре можно все, преподаватель поддержит любые идеи и эксперименты.</p><p>На первых этапах в рисовании мешает не столько отсутствие навыков, сколько предубеждения и страхи: «а если не получится», «не знаю, как правильно». Поэтому в начале важна поддержка и дружелюбная атмосфера. На вебинаре можно все, преподаватель поддержит любые идеи и эксперименты.</p></div>
          </div>
          <div className={classes.listItemCard}>
            <div className={classes.listItemMedia}><img data-v-desktop-2 alt="Иллюстрация" src={ModulesImages}  /></div>
            <div className={classes['listItemMediaDesc'] + ' s-text-18'}>София Ульянова</div>
          </div>
        </div>
      </div>
    </div>
  );
}