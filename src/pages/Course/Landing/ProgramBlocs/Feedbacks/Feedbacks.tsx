import type { ICourseData } from 'types';
import classes from './Feedbacks.module.scss';

import classNames from 'classnames/bind';
import { formatI18nT } from 'shared';
import Animated from 'ui/Animated';

import Item from './Item/Item';

export default Feedbacks;

const t = formatI18nT('courseLanding.feedback');
const cx = classNames.bind(classes);

interface IProps {
  data: ICourseData
}

function Feedbacks(props: IProps) {
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
        {props.data.feedbacks && props.data.feedbacks.map((d, index) =>
          <Item key={index} {...d}/>
        )}
      </div>
    </div>
  );
}
