import type { IArticleQuestionBlock } from 'types';

import UIText from 'ui/Text/Text';

import classes from './Question.module.scss';

export default function Question({ question, factoid }: Omit<IArticleQuestionBlock, 'type'>) {
  if (!question) {
    return null;
  }

  return (
    <>
      {/* {props.data.factoid && <p className={classes.factoid}> <UIText text={props.data.factoid}/> </p>} */}
    </>
  );
}
