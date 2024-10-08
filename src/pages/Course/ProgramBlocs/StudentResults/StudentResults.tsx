import classNames from 'classnames/bind';

import type { ICourseData, TCourseStudentResult } from 'services/course.service';
import { formatI18nT } from 'shared';

import Image from 'ui/Img/Img';
import Text from 'ui/Text/Text';

import classes from './StudentResults.module.scss';

export default StudentResults;

const t = formatI18nT('courseLanding.studentsResults');
const cx = classNames.bind(classes);

interface IProps {
  studentResults: TCourseStudentResult
}

function StudentResults({ studentResults }: IProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h2 className={cx({ title: true })} >{t(`title`)}</h2>
        <div className={classes.desc}>{<Text text={studentResults.content}/>}</div>
      </div>
      {/* <div className={classes.listItem}>
        <div className={cx({ listItemCard: true })}>
          <div className={classes.listItemMedia}><Image src={studentResults.imageSrc} alt={studentResults.imageAlt}/></div>
        </div>
      </div> */}
    </div>
  );
}
