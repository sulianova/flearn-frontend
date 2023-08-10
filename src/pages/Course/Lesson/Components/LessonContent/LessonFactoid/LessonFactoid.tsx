import { Fragment } from 'react';
import type { ILessonFactoidBlock } from 'types';
import classes from './LessonFactoid.module.scss';

import UIText from 'ui/Text/Text';

export default LessonFactoid;

interface IProps {
  data: ILessonFactoidBlock
}

function LessonFactoid(props: IProps) {
  return (
    <Fragment>
      {props.data.factoid && <div className={classes.factoid + ' s-text-21'}> <UIText text={props.data.factoid}/> </div>}
    </Fragment>
  );
}
