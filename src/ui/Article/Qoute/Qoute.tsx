import { Fragment } from 'react';
import type { IArticleQouteBlock } from 'types';
import classes from './Qoute.module.scss';

import UIText from 'ui/Text/Text';

export default Qoute;

interface IProps {
  data: IArticleQouteBlock
}

function Qoute(props: IProps) {
  return (
    <Fragment>
      {props.data.qoute && <div className={classes.qouteWrapper}><UIText text={props.data.qoute}/></div>}
    </Fragment>
  );
}
