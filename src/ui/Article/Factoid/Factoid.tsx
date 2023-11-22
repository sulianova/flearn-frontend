import { Fragment } from 'react';
import type { IArticleFactoidBlock } from 'types';
import classes from './Factoid.module.scss';

import UIText from 'ui/Text/Text';

export default Factoid;

interface IProps {
  data: IArticleFactoidBlock
}

function Factoid(props: IProps) {
  return (
    <Fragment>
      {props.data.factoid && <p className={classes.factoid}> <UIText text={props.data.factoid}/> </p>}
    </Fragment>
  );
}
