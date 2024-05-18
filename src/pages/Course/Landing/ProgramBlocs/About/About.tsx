import classNames from 'classnames/bind';
import { Fragment } from 'react';

import type { ICourseData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Text from 'ui/Text/Text';

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
      <div className={classes.wrapper}>
        <h2 className={cx({ title: true }) + ' s-text-56'} >{t(`title.${type}`)}</h2>
        <div className={classes.listItem}>
          <div className={cx({ listItemCard: true })}>
            <div className={classes.listItemContent + ' s-text-21'}><Text text={about}/></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
