import { Fragment } from 'react';
import type { IArticleTextImportantBlock } from 'types';
import classes from './TextImportant.module.scss';
import UIText from 'ui/Text/Text';

export default TextImportant;

interface IProps {
  data: IArticleTextImportantBlock
}

function TextImportant(props: IProps) {
  return (
    <div className={classes.__}>
      {props.data.text && <div className={classes.textImportantWrapper}><UIText text={props.data.text}/></div>}
    </div>
  );
}
