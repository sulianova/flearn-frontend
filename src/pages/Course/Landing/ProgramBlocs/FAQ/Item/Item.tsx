import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import type { ICourseData } from 'services/course.service';

import Minus from 'assets/images/Svg/Minus';
import PlusOpen from 'assets/images/Svg/PlusOpen';
import Animated from 'ui/Animated';
import Text from 'ui/Text/Text';

import classes from './Item.module.scss';

const cx = classNames.bind(classes);

export default Item;

interface IProps {
  faq: NonNullable<ICourseData['faq']>[number]
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
          <div className={classes.itemQuestion + ' s-text-21'}>
            <div className={classes.itemQuestionText}>
              <Text text={question}/>
            </div>
            <div className={classes.itemQuestionPlus}>
              {isExpanded ? <Minus/> : <PlusOpen/>}
            </div>
          </div>
          <div
            ref={ref}
            style={{ height }}
            className={cx({ itemAnswer: true, itemAnswerExpanded: isExpanded }, ' s-text-21')}
          >
            <div className={classes.itemAnswerText}><Text text={answer}/></div>
          </div>
        </div>
      )}
    </Animated.Scroll>
  );
}