import type { IArticleQuoteBlock } from 'types';

import UIText from 'ui/Text/Text';

import classes from './Quote.module.scss';

export default function Quote({ quote }: Omit<IArticleQuoteBlock, 'type'>) {
  if (!quote) {
    return null;
  }

  return (
    <div className={classes.__}>
      <div className={classes.quoteWrapper}>
        <UIText text={quote}/>
      </div>
    </div>
  );
}
