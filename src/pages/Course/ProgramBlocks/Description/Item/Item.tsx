import Animated from 'ui/Animated';

import classNames from 'classnames/bind';
import classes from './Item.module.scss';

const cx = classNames.bind(classes);

interface IProps {
  question: string
  answer: string
}

export default function Item(props: IProps) {
  return (
    <Animated.Scroll>
      {(id, className) => (
        <div className={cx({ _: true }, className)} id={id}>
          <div className={classes.content}>
            <div className={classes.title}>{props.question}</div>
            <div className={classes.desc}>{props.answer}</div>
          </div>
        </div>
      )}
    </Animated.Scroll>
  );
}
