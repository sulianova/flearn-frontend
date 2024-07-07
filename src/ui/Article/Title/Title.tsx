import type { IArticleTitleBlock } from 'types';

import classes from './Title.module.scss';

export default function Title({ title }: Omit<IArticleTitleBlock, 'type'>) {
  if (!title) {
    return null;
  }

  return (
    <h2 className={classes.title} data--title>
      {title}
    </h2>
  );
}
