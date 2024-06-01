import classNames from 'classnames/bind';
import { Fragment } from 'react';

import type { ICourseData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Text from 'ui/Text/Text';
import Start from 'assets/images/Svg/Start';
import Feature from 'assets/images/Svg/Feature';
import Portfolio from 'assets/images/Svg/Portfolio';

import classes from './About.module.scss';

export default About;

const t = formatI18nT('courseLanding.About');
const cx = classNames.bind(classes);

interface IProps {
  type: ICourseData['type']
  about: NonNullable<ICourseData['about']>
}

function About({ type, about }: IProps) {
  return (
    <Fragment>
      <ul className={classes.__}>
        <li className={classes.item}>
          <div className={classes.itemSvg}><Start/></div>
          <div className={classes.itemText + ' s-text-16'}>Получите базовые навыки, чтобы начать карьеру</div>
        </li>
        <li className={classes.item}>
          <div className={classes.itemSvg}><Feature/></div>
          <div className={classes.itemText + ' s-text-16'}>Погрузитесь в востребованные направления: веб-иллюстрация, книжная иллюстрация и брендинг</div>
        </li>
        <li className={classes.item}>
          <div className={classes.itemSvg}><Portfolio/></div>
          <div className={classes.itemText + ' s-text-16'}>Научитесь применять навыки на практике и сделаете 8+ проектов для портфолио</div>
        </li>
      </ul>
      {/* <div className={classes.wrapper}>
        <h2 className={cx({ title: true }) + ' s-text-56'} >{t(`title.${type}`)}</h2>
        <div className={classes.listItem}>
          <div className={cx({ listItemCard: true })}>
            <div className={classes.listItemContent + ' s-text-21'}><Text text={about}/></div>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
}
