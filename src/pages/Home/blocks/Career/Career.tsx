import classes from './Career.module.scss'; 

export default function Career() {
  return (
    <div className={classes.__}>
      <div className={classes.title}>Иллюстратор — профессия без границ. Иллюстрации нужны для веб-сайтов, книг, логотипов и стикеров. С иллюстратором сотрудничают издательства, рекламные агентства и владельцы бизнеса.</div>
      <span className={classes.title + ' color-content-inverted-secondary'}>Освоить профессию можно без художественного образования</span>
    </div>
  );
}