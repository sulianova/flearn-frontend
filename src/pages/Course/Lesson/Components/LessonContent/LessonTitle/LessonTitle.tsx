import { Fragment } from 'react';
import type { ILessonTitleBlock } from 'types';
import classes from './LessonTitle.module.scss';

import UIText from 'ui/Text/Text';

export default LessonTitle;

interface IProps {
  data: ILessonTitleBlock
}

function LessonTitle(props: IProps) {
  return (
    <Fragment>
      {props.data.title && <h2 className={classes.title + ' s-text-36'} data-lesson-title>{props.data.title}</h2>}
    </Fragment>
  );
}
