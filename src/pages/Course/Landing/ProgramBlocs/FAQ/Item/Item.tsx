import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import type { ICourseFaqItem } from 'services/course.service';

import Icon from 'ui/Icon/Icon';
import Animated from 'ui/Animated';
import Text from 'ui/Text/Text';

import classes from './Item.module.scss';

const cx = classNames.bind(classes);

export default Item;

interface IProps {
  faq: ICourseFaqItem
}

function Item({ faq: { question, answer } }: Readonly<IProps>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight(isExpanded ? (ref.current?.scrollHeight ?? 0) : 0);
  }, [isExpanded]);

  return (
    <Animated.Scroll>
      {(id, className) => (
        <div
          id={id}
          className={cx({ item: true }, className)}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className={classes.itemQuestion}>
            <div className={classes.itemQuestionText}>
              <Text text={question}/>
            </div>
            <div className={classes.itemQuestionPlus}>
              {isExpanded ? <Icon icon='Minus'/> : <Icon icon='PlusOpen'/>}
            </div>
          </div>
          <div
            ref={ref}
            style={{ height }}
            className={cx({ itemAnswer: true, itemAnswerExpanded: isExpanded })}
          >
            <div className={classes.itemAnswerText}><Text text={answer}/></div>
          </div>
        </div>
      )}
    </Animated.Scroll>
  );
}