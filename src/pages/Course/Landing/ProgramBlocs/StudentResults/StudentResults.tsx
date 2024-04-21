import classNames from 'classnames/bind';

import type { ICourseData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Image from 'ui/Img/Img';
import Text from 'ui/Text/Text';

import classes from './StudentResults.module.scss';

export default StudentResults;

const t = formatI18nT('courseLanding.StudentsResults');
const cx = classNames.bind(classes);

interface IProps {
  studentResults: NonNullable<ICourseData['studentResults']>
}

function StudentResults({ studentResults }: IProps) {
  return (
    <div className={classes.wrapper}>
      <h2 className={cx({ title: true }) + ' s-text-56'} >{t(`title`)}</h2>
      <div className={classes.listItem}>
        <div className={cx({ listItemCard: true })}>
          <div className={classes.listItemContent + ' s-text-24'}><Text text={studentResults.content}/></div>
        </div>
        <div className={cx({ listItemCard: true })}>
          <div className={classes.listItemMedia}><Image src={studentResults.imageSrc} alt={studentResults.imageAlt}/></div>
        </div>
      </div>
    </div>
  );
}
