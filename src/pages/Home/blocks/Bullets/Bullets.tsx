import classes from './Bullets.module.scss';
import BulletEasy from 'assets/images/Svg/BulletEasy';
import BulletMedium from 'assets/images/Svg/BulletMedium';
import BulletAdvanced from 'assets/images/Svg/BulletAdvanced';

export default function Bullets() {
  return (
    <ul className={classes.__}>
      <li className={classes.item}>
        <div className={classes.itemSvg}><BulletEasy/></div>
        <div className={classes.itemText + ' s-text-16'}>Получите базовые навыки, чтобы начать карьеру</div>
      </li>
      <li className={classes.item}>
        <div className={classes.itemSvg}><BulletMedium/></div>
        <div className={classes.itemText + ' s-text-16'}>Погрузитесь в востребованные направления: веб-иллюстрация, книжная иллюстрация и брендинг</div>
      </li>
      <li className={classes.item}>
        <div className={classes.itemSvg}><BulletAdvanced/></div>
        <div className={classes.itemText + ' s-text-16'}>Научитесь применять навыки на практике и сделаете 8+ проектов для портфолио</div>
      </li>
    </ul>
  );
}