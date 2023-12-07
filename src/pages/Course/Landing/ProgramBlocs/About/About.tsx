import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { formatI18nT } from 'shared';
import Animated from 'ui/Animated';
import Image from 'ui/Img/Img';
import Sticker from 'assets/images/Svg/Sticker';
import classes from './About.module.scss';

import { ICourseData } from 'types';
import Text from 'ui/Text/Text';

export default About;

const t = formatI18nT('courseLanding.prizes');
const cx = classNames.bind(classes);

interface IProps {
  data: ICourseData
}

function About(props: IProps) {
  const { about } = props.data;
  if (!about) {
    return null;
  }

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
