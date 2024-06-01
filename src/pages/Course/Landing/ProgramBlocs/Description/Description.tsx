import classNames from 'classnames/bind';

import type { ICourseData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Animated from 'ui/Animated';

import classes from './Description.module.scss';
import Item from './Item/Item';

export default Description;

const t = formatI18nT('courseLanding.description');
const cx = classNames.bind(classes);

interface IProps {
  type: ICourseData['type']
  description: NonNullable<ICourseData['description']>
}

function Description({ type, description }: IProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h2 className={' s-text-70'}>{t(`title.${type}`)}</h2>
      </div>
      <div className={classes.list}>
        {description.map((d, index) => (
          <Item key={index} {...d}/>
        ))}
      </div>
    </div>
  );
}
