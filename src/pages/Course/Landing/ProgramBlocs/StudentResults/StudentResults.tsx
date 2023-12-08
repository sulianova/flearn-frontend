import classNames from 'classnames/bind';

import { formatI18nT } from 'shared';
import Image from 'ui/Img/Img';
import classes from './StudentResults.module.scss';

import { ICourseData } from 'types';
import Text from 'ui/Text/Text';

export default StudentResults;

const t = formatI18nT('courseLanding.modules');
const cx = classNames.bind(classes);

interface IProps {
  data: ICourseData
}

function StudentResults(props: IProps) {
  const { studentResults } = props.data;
  if (!studentResults) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.listItem}>
        <div className={cx({ listItemCard: true })}>
          <div className={classes.listItemTitle + ' s-text-36'}>Что получится в результате</div>
          <div className={classes.listItemContent + ' s-text-24'}><Text text={studentResults.content}/></div>
        </div>
        <div className={cx({ listItemCard: true })}>
          <div className={classes.listItemMedia}><Image src={studentResults.imageSrc} alt={studentResults.imageAlt}/></div>
        </div>
      </div>
    </div>
  );
}
