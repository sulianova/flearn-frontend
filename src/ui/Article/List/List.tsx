import type { IArticleListBlock } from 'types';

import UIText from 'ui/Text/Text';

import classes from './List.module.scss';

export default function List({ items }: Omit<IArticleListBlock, 'type'>) {
  if (!items.length) {
    return null;
  }

  return (
    <ul className={classes.__}>
      {items.map((item, i) => (
        <li className={classes.item} key={i}>
          <UIText text={item}/>
        </li>
      ))}
    </ul>
  );
}
