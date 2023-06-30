import classes from './ProgramIntro.module.scss';
import { DrawFree } from 'assets/images';



export default ProgramIntro;

function ProgramIntro() {
  return (
    <div className={classes._} id="program-intro">
      <div className={classes.inner}>
        <div className={classes.categories}>
          <div className={classes['categories-item'] + ' s-text-18'}>27 марта | 4 недели</div>
          <div className={classes['categories-item'] + ' s-text-18'}>Иллюстрация</div>
        </div>
        <h1 className={classes['title'] + ' s-text-88'}>Как рисовать свободно</h1>
        <div className={classes['block'] + ' s-text-24'}>Поговорим о свободе в рисунке, сделаем упражнения и 3-4 законченные работы. Будем анализировать рисовальный опыт, отмечать, что вызывает сопротивление, скуку, интерес.</div>
        <div className={classes.actions}><a className={classes['actions-btn'] + ' s-text-24'} href="#decision-form">Записаться</a>
          <div className={classes['actions-discount'] + ' s-text-24'} >-30% до 30 апреля</div>
        </div>
        <div className={classes.cover}><img data-v-desktop alt="Иллюстрация" src={DrawFree}/></div>
      </div>
    </div>
  );
}
