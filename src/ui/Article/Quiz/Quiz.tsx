import type { IArticleQuizBlock } from 'types';

import UIText from 'ui/Text/Text';

import classes from './Quiz.module.scss';

export default function Quiz({ quiz, factoid }: Omit<IArticleQuizBlock, 'type'>) {
  if (!quiz) {
    return null;
  }

  return (
    <>
      {/* {props.data.factoid && <p className={classes.factoid}> <UIText text={props.data.factoid}/> </p>} */}
    </>
  );
}
