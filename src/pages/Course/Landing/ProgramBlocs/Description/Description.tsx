import classNames from 'classnames/bind';

import type { ICourseData, ICourseDescription } from 'services/course.service';
import { formatI18nT } from 'shared';

import classes from './Description.module.scss';
import Item from './Item/Item';

export default Description;

const t = formatI18nT('courseLanding.description');
const cx = classNames.bind(classes);

interface IProps {
  type: ICourseData['type']
  description: ICourseDescription[]
}

function Description({ type, description }: IProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h2 className={classes.headerTitle}>{t(`title.${type}`)}</h2>
      </div>
      <div className={classes.list}>
        {description.map((d, index) => (
          <Item key={index} {...d}/>
        ))}
      </div>
    </div>
  );
}
