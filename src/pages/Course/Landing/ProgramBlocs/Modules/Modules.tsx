import classNames from 'classnames/bind';
import { Fragment } from 'react';

import type { ICourseData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Animated from 'ui/Animated';
import Image from 'ui/Img/Img';
import Text from 'ui/Text/Text';
import Plus from 'assets/images/Svg/Plus';
import SubsectionArrow from 'assets/images/Svg/SubsectionArrow';

import classes from './Modules.module.scss';
import Item from './Item/Item';

export default Modules;

const t = formatI18nT('courseLanding.modules');
const cx = classNames.bind(classes);

interface IProps extends Pick<ICourseData, 'videosNumber' | 'homeworksNumber' | 'duration'> {
  modules: NonNullable<ICourseData['modules']>
  modulesDescription: NonNullable<ICourseData['modulesDescription']>
}

function Modules(props: IProps) {
  const { modules, modulesDescription, videosNumber, homeworksNumber, duration } = props;
  return (
      <div className={classes.wrapper}>
        <div className={classes.header}>{t('title')}</div>
        <div className={classes.list}>
          {modules.map((d, index) => <Item key={index} {...d}/>)}
        </div>
      </div>
  );
}
