import { Fragment } from 'react';
import type { ILessonQouteBlock } from 'types';
import classes from './LessonQoute.module.scss';

import UIText from 'ui/Text/Text';

export default LessonQoute;

interface IProps {
  data: ILessonQouteBlock
}

function LessonQoute(props: IProps) {
  return (
    <Fragment>
      {props.data.qoute && <div className={classes.qouteWrapper}><UIText text={props.data.qoute}/></div>}
    </Fragment>
  );
}
