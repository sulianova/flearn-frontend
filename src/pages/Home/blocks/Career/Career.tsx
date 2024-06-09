import classes from './Career.module.scss'; 

export default function Career() {
  return (
    <div className={classes.__}>
      <span className={classes.title}>Преподаем иллюстрацию как метод творческого мышления, а не как набор профессиональных навыков и приёмов. </span>
      <span className={classes.title + ' color-content-tertiary'}>Учим создавать рекламные образы, айдентику и иллюстрации для цифровых продуктов на языке современной графики</span>
    </div>
  );
}