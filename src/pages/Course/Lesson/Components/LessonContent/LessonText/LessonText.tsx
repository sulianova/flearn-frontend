import { Fragment } from 'react';
import type { ILessonTextBlock } from 'types';
import classes from './LessonText.module.scss';

import UIText from 'ui/Text/Text';

export default LessonText;

interface IProps {
  data: ILessonTextBlock
}

function LessonText(props: IProps) {
  return (
    <Fragment>
      {props.data.text && <p className={classes.text + ' s-text-21'}>{props.data.text}</p>}
    </Fragment>
  );
}
