import classNames from 'classnames/bind';
import { Fragment } from 'react';

import type { ICourseData } from 'services/course.service';

import Text from 'ui/Text/Text';

import classes from './About.module.scss';

export default About;

const cx = classNames.bind(classes);

interface IProps {
  about: NonNullable<ICourseData['about']>
}

function About({ about }: IProps) {
  return (
    <Fragment>
      <div className={classes.wrapper}>
        <h2 className={cx({ title: true }) + ' s-text-56'} >Об интенсиве</h2>
        <div className={classes.listItem}>
          <div className={cx({ listItemCard: true })}>
            <div className={classes.listItemContent + ' s-text-24'}><Text text={about}/></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
