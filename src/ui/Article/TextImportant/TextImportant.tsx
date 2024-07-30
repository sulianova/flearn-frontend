import type { IArticleTextImportantBlock } from 'types';

import UIText from 'ui/Text/Text';

import classes from './TextImportant.module.scss';

export default function TextImportant({ text }: Omit<IArticleTextImportantBlock, 'type'>) {
  if (!text) {
    return null;
  }

  return (
    <div className={classes.__}>
      <div className={classes.textImportantWrapper}>
        <span className={classes.quoteMark}>«</span>
        <p className={classes.quoteText}>
          <UIText text={text}/>
          <span className={classes.quoteSub}></span>
        </p>
        <span className={classes.quoteMark}>»</span>
      </div>
    </div>
  );
}
