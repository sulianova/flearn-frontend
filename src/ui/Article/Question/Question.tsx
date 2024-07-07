import { Fragment } from 'react';
import type { IArticleQuestionBlock } from 'types';
import classes from './Question.module.scss';

import UIText from 'ui/Text/Text';

export default Question;

interface IProps {
  data: IArticleQuestionBlock
}

function Question(props: IProps) {
  return (
    <Fragment>
      {/* {props.data.factoid && <p className={classes.factoid}> <UIText text={props.data.factoid}/> </p>} */}
    </Fragment>
  );
}
