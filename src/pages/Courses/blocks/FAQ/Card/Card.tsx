import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import type { ICourseFaqItem } from 'services/course.service';

import Icon from 'ui/Icon/Icon';
import Text from 'ui/Text/Text';

import classes from './Card.module.scss';

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
        className={cx({ wrapper: true })}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={classes.title}>
            {question}
          <div className={cx({ arrow: true, arrow_expended: isExpanded })}>
            <Icon icon='ChevronDown'/>
          </div>
        </div>
        <div
          ref={ref}
          style={{ height }}
          className={cx({ description: true, description_expanded: isExpanded })}
        >
          {answer}
        </div>
      </div>
    </>
  );
}