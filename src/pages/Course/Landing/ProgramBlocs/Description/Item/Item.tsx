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
          <div className={classes.questionWrapper}>
            <div className={classes.question + ' s-text-28'}>{props.question}</div>
          </div>
          <div className={classes.answear + ' s-text-21'}>{props.answer}</div>
        </div>
      )}
    </Animated.Scroll>
  );
}
