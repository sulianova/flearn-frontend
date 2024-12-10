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
        <UIText text={text}/>
      </div>
    </div>
  );
}
