import { Fragment } from 'react';
import type { IArticleTextBlock } from 'types';
import UIText from 'ui/Text/Text';
import classes from './Text.module.scss';

export default Text;

interface IProps {
  data: IArticleTextBlock
}

function Text(props: IProps) {
  return (
    <Fragment>
      {props.data.text && <p className={classes.text + ' s-text-21'}><UIText text={props.data.text}/></p>}
    </Fragment>
  );
}
