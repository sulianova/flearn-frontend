import classNames from 'classnames/bind';
import { formatI18nT } from 'shared';

import type { ICourseData } from 'services/course.service';

import Text from 'ui/Text/Text';

import classes from './Prizes.module.scss';

export default Prizes;

const t = formatI18nT('courseLanding.prizes');
const cx = classNames.bind(classes);

interface IProps {
  type: ICourseData['type']
  prizes: NonNullable<ICourseData['prizes']>
}

function Prizes({ type, prizes }: IProps) {
  return (
    <div className={classes.wrapper}>
      <h2 className={cx({ title: true }) + ' s-text-56'} >{t(`title.${type ?? 'course'}`)}</h2>
      <div className={classes.listItem}>
        {prizes.map((prize, i) => (
          <div className={cx({ listItemCard: true })} key={i}>
            <div className={classes.listItemTitle + ' s-text-28'}><Text text={prize.title}/></div>
            {prize.content && <div className={classes.listItemContent + ' s-text-18'}><Text text={prize.content}/></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
