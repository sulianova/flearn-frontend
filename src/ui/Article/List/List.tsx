import type { IArticleListBlock } from 'types';
import classes from './List.module.scss';

import UIText from 'ui/Text/Text';

export default List;

interface IProps {
  data: IArticleListBlock
}

function List(props: IProps) {
  return (
    <ul className={classes.__}>
      <li className={classes.item}>лалала</li>
      <li className={classes.item}>лалала</li>
      <li className={classes.item}>лалала</li>
    </ul>
  );
}