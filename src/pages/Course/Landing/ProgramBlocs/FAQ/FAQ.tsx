import { Fragment } from 'react';
import classes from './FAQ.module.scss';

import type { ICourseData } from 'types';
import Text from 'ui/Text/Text';

export default FAQ;

interface IProps {
  data: ICourseData
}

function FAQ(props: IProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h2 className={classes.headerTitle + ' s-text-56'}>Ответы на вопросы</h2>
        <div className={classes.headerDesc + ' s-text-24'}>
          Если у вас остались вопросы по курсу, вы можете&nbsp;
          <a>оставить заявку</a>
          &nbsp;и я помогу вам разобраться.
        </div>
      </div>
      <div className={classes.list}>
        {renderItems(props.data.faq)}
      </div>
    </div>
  );
}

function renderItem(props: ICourseData['faq'][number]) {
  return (
    <div className={classes.item}>
    <div className={classes.itemQuestion + ' s-text-24'}><Text text={props.question}/></div>
    <div className={classes.itemAnswer + ' s-text-18'}><Text text={props.answer}/></div>
  </div>
  );
}

function renderItems(props: ICourseData['faq'] ) {
  return props.map((d, index) => (<Fragment key={index}>{renderItem(d)}</Fragment>));
}
