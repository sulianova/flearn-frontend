import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import type { ICourseFaqItem } from 'services/course.service';

import Icon from 'ui/Icon/Icon';
import Animated from 'ui/Animated';
import Text from 'ui/Text/Text';

import classes from './Item.module.scss';

const cx = classNames.bind(classes);

export default Item;


function Item() {
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
            Как проходит онлайн обучение
          </div>
          <div className={cx({ itemArrow: true, itemArrowExpended: isExpanded })}>
            <Icon icon='SubsectionArrow'/>
          </div>
        </div>
        <div
          ref={ref}
          style={{ height }}
          className={cx({ itemAnswer: true, itemAnswerExpanded: isExpanded })}
        >
          <div className={classes.itemAnswerText}>
            Всю информацию и практические задания мы собрали в интерактивном учебнике. Проходить его можно в любое удобное время, с компьютера или с телефона. Вопросы, возникающие по ходу задаем в любое время в телеграмм-канале — раз в сутки преподаватель отвечает на них.
          </div>
        </div>
      </div>
    </>
  );
}