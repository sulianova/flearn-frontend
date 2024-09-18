import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import type { ICourseFaqItem } from 'services/course.service';

import Icon from 'ui/Icon/Icon';
import Animated from 'ui/Animated';
import Text from 'ui/Text/Text';

import classes from './Item.module.scss';

const cx = classNames.bind(classes);

export interface IProps {
  question: string
  answer: string
}

export default function Item(props: IProps) {
  const { question, answer } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight(isExpanded ? (ref.current?.scrollHeight ?? 0) : 0);
  }, [isExpanded]);

  return (
    <>
      <div
        className={cx({ item: true })}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={classes.itemQuestion}>
          <div className={classes.itemQuestionText}>
            {question}
          </div>
          <div className={cx({ itemArrow: true, itemArrowExpended: isExpanded })}>
            <Icon icon='ChevronDown'/>
          </div>
        </div>
        <div
          ref={ref}
          style={{ height }}
          className={cx({ itemAnswer: true, itemAnswerExpanded: isExpanded })}
        >
          <div className={classes.itemAnswerText}>
            {answer}
          </div>
        </div>
      </div>
    </>
  );
}