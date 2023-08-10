import { Fragment } from 'react';
import type { ILessonTextImportantBlock } from 'types';
import classes from './LessonTextImportant.module.scss';

import UIText from 'ui/Text/Text';

export default LessonTextImportant;

interface IProps {
  data: ILessonTextImportantBlock
}

function LessonTextImportant(props: IProps) {
  return (
    <Fragment>
      {props.data.text && <p className={classes.textImportant + ' s-text-28'}>{props.data.text}</p>}
    </Fragment>
  );
}
