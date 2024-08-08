import type { IArticleTextBlock } from 'types';

import UIText from 'ui/Text/Text';

import classes from './Text.module.scss';

export default function Text({ text }: Omit<IArticleTextBlock, 'type'>) {
  if (!text) {
    return null;
  }

  return (
    <p className={classes.text}>
      <UIText text={text}/>
    </p>
  );
}
