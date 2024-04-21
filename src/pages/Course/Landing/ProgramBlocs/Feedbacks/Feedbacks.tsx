import classNames from 'classnames/bind';

import type { ICourseData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Animated from 'ui/Animated';

import Item from './Item/Item';
import classes from './Feedbacks.module.scss';

export default Feedbacks;

const t = formatI18nT('courseLanding.feedback');
const cx = classNames.bind(classes);

interface IProps {
  feedbacks: NonNullable<ICourseData['feedbacks']>
}

function Feedbacks({ feedbacks }: IProps) {
  return (
    <div className={classes.wrapper}>
      <Animated.Scroll>
        {(id, className) => (
          <h2 className={cx({ title: true }, className) + ' s-text-56'} id={id}>
            {t(`title`)}
          </h2>
        )}
      </Animated.Scroll>
      <div className={classes.list}>
        {feedbacks.map((d, index) =>
          <Item key={index} {...d}/>
        )}
      </div>
    </div>
  );
}
