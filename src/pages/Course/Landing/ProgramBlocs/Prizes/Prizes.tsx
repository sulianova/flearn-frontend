import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { formatI18nT } from 'shared';
import Animated from 'ui/Animated';
import Image from 'ui/Img/Img';
import Sticker from 'assets/images/Svg/Sticker';
import classes from './Prizes.module.scss';

import { ICourseData } from 'types';
import Text from 'ui/Text/Text';

export default Prizes;

const t = formatI18nT('courseLanding.prizes');
const cx = classNames.bind(classes);

interface IProps {
  data: ICourseData
}

function Prizes(props: IProps) {
  const { type, prizes } = props.data;
  if (!prizes || !prizes.length) {
    return null;
  }

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <h2 className={cx({ title: true }) + ' s-text-56'} >{t(`title.${type ?? 'course'}`)}</h2>
        <div className={classes.listItem}>
          <div className={cx({ listItemCard: true })}>
            <div className={classes.listItemTitle + ' s-text-28'}><Text text={prizes[0].title}/></div>
            {prizes[0].content && <div className={classes.listItemContent + ' s-text-18'}><Text text={prizes[0].content}/></div>}
          </div>
          <div className={cx({ listItemCard: true })}>
            <div className={classes.listItemTitle + ' s-text-28'}><Text text={prizes[1].title}/></div>
            {prizes[1].content && <div className={classes.listItemContent + ' s-text-18'}><Text text={prizes[1].content}/></div>}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
