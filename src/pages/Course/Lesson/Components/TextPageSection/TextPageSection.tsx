import classes from './TextPageSection.module.scss';
export default TextPageSection;

function Title() {
  return (
    <h2 className={classes.title + ' s-text-21-uppercase'}>таймкоды</h2>
  );
}

function Content() {
  return (
    <div className={classes.content}>
    <p className='s-text-21'> 00:47 — Эффекты 3D.</p>
    <p className='s-text-21'> 02:23 — Настройки освещения.</p>
    <p className='s-text-21'> 4:30 — Настройка Map Art.</p>
    <p className='s-text-21'> 09:03 — Эффект построения по сечению (Revolve).</p>
    <p className='s-text-21'> 10:54 — Эффект «Повернуть фигуру» (Rotate).</p>
    <p className='s-text-21'> 12:14 — Панель оформления.</p>
  </div>
  );
}

function TextPageSection() {
  return (
    <section className={classes._}>
      <Title/>
      <Content/>
    </section>
    // <section className={classes._}>
    //   <h2 className={classes.title + " s-text-21-uppercase"}>описание</h2>
    //   <div className={classes.content}>
    //     <p className="s-text-21">
    //       Поговорим о свободе в рисунке, сделаем упражнения и 3-4 законченные работы.
    //       Будем анализировать рисовальный опыт, отмечать, что вызывает сопротивление, скуку, интерес.
    //     </p>
    //   </div>
    // </section>
    // <section className={classes._}>
    //   <h2 className={classes.title + " s-text-21-uppercase"}>узнать больше</h2>
    //   <div className={classes.content}>
    //     <a className="inline-link s-text-21"> Ссылка 1</a><a className="inline-link s-text-21"> Ссылка 2</a>
    //     <a className="inline-link s-text-21"> Ссылка 3</a>
    //   </div>
    // </section>
    // <section className={classes._}>
    //   <h2 className={classes.title + " s-text-21-uppercase"}>материалы</h2>
    //   <div className={classes.content}><a className="inline-link s-text-21"> Скачать презентацию</a></div>
    // </section>
  );
}
