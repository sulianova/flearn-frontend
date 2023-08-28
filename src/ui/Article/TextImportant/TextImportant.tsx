import { Fragment } from 'react';
import type { IArticleTextImportantBlock } from 'types';
import classes from './TextImportant.module.scss';

export default TextImportant;

interface IProps {
  data: IArticleTextImportantBlock
}

function TextImportant(props: IProps) {
  return (
    <Fragment>
      {props.data.text && <p className={classes.textImportant + ' s-text-28'}>{props.data.text}</p>}
    </Fragment>
  );
}
