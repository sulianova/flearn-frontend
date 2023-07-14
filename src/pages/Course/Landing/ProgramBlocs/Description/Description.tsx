import { Fragment } from 'react';
import type { ICourseData } from 'types';
import classes from './Description.module.scss';
import classesItem from './Item.module.scss';

export default Description;

interface IProps {
  data: ICourseData
}

function Description(props: IProps) {
  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title + ' s-text-56'}>Курс подойдeт тем, кто</h2>
      <div className={classes.list}>
        {renderItems(props.data.description)}
      </div>
    </div>
  );
}

function renderItem(props: { question: string, answer: string }) {
  return (
    <div className={classesItem._}>
      <div className={classesItem.questionWrapper}>
        <div className={classesItem.question + ' s-text-18'}>{props.question}</div>
      </div>
      <div className={classesItem.answear + ' s-text-28'}>{props.answer}</div>
    </div>
  );
}

function renderItems(props: Array<{ question: string, answer: string }> ) {
  return props.map((d, index) => (<Fragment key={index}>{renderItem(d)}</Fragment>));
}
