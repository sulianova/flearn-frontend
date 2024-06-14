import classNames from 'classnames/bind';
import { Fragment } from 'react';

import type { ICourseData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Text from 'ui/Text/Text';
import Icon from 'ui/Icon/Icon';

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
          <div className={classes.itemSvg}><Icon icon='Start'/></div>
          <div className={classes.itemText}>Получите базовые навыки, чтобы начать карьеру</div>
        </li>
        <li className={classes.item}>
          <div className={classes.itemSvg}><Icon icon='Feature'/></div>
          <div className={classes.itemText}>Погрузитесь в востребованные направления: веб-иллюстрация, книжная иллюстрация и брендинг</div>
        </li>
        <li className={classes.item}>
          <div className={classes.itemSvg}><Icon icon='Portfolio'/></div>
          <div className={classes.itemText}>Научитесь применять навыки на практике и сделаете 8+ проектов для портфолио</div>
        </li>
      </ul>
    </Fragment>
  );
}
