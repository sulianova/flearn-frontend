import classNames from 'classnames/bind';

import type { ICourseFeedback } from 'services/course.service';
import { formatI18nT } from 'shared';

import Animated from 'ui/Animated';

import Item from './Item/Item';
import classes from './Feedbacks.module.scss';

export default Feedbacks;

const t = formatI18nT('courseLanding.feedback');
const cx = classNames.bind(classes);

interface IProps {
  feedbacks: ICourseFeedback[]
}

function Feedbacks({ feedbacks }: IProps) {
  return (
    <div className={classes.wrapper}>
      <Animated.Scroll>
        {(id, className) => (
          <h2 className={cx({ title: true }, className)} id={id}>
            {t(`title`)}
          </h2>
        )}
      </Animated.Scroll>
      <div className={classes.list}>
        {feedbacks.map((feedback, index) =>
          <Item key={index} feedback={feedback}/>
        )}
      </div>
    </div>
  );
}
