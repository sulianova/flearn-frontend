import classNames from 'classnames/bind';

import type { ICourseData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Animated from 'ui/Animated';
import Image from 'ui/Img/Img';

import classes from './StudentsWorks.module.scss';

export default StudentsWorks;

const cx = classNames.bind(classes);
const t = formatI18nT('courseLanding.studentsWorks');

interface IProps {
  studentsWorks: NonNullable<ICourseData['studentsWorks']>
}

function StudentsWorks({ studentsWorks }: IProps) {
  return (
    <div className={classes.__}>
      <Animated.Scroll>
        {(id, className) => (<h2 className={cx({ title: true }, className) + ' s-text-18'} id={id}>{t('title')}</h2>)}
      </Animated.Scroll>
      <div className={cx({ list: true })}>
      {studentsWorks.map(({ imageSrc, imageAlt }, index) => (
        <div className={cx({ item: true })} key={index}>
          <Image src={imageSrc} alt={imageAlt}/>
        </div>
      ))}
      </div>
    </div>
  );
}
